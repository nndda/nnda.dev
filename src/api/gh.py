import os
import sys
import json
import math
import requests
from datetime import datetime, timezone
from typing import Any
from dotenv import load_dotenv
from utils import fetch_json, cleanup_dir, write_txt_file


load_dotenv()

if not os.getenv("GH_PAT"):
    print("Error: GH_PAT is not set", file=sys.stderr)
    sys.exit(0)


script_dir: str = os.path.dirname(os.path.abspath(__file__))
cleanup_dir(script_dir)


user: str = "nndda"
pat: str = os.getenv("GH_PAT")

start_year: int = 2021
current_time: int = int(datetime.now(timezone.utc).timestamp() * 1000)

gh_headers: dict[str, str] = {
  "Accept": "application/vnd.github+json",
  "Authorization": f"Bearer {pat}",
  "X-GitHub-Api-Version": "2022-11-28",
}

lang_data: dict[str, Any] = {
    "total": 0,
    "perByte": {},
    "perCent": {},
    "frontEnd": {}
}

contribs_data: dict[str, Any] = {
    "days": {
        "all": 0,
        "yearly": 0,
    },
    "stats": {
        "total": {
            "all": 0,
            "yearly": 0,
        },
        "highest": {
            "all": 0,
            "yearly": 0,
        },
        "streaks": {
            "all": 0,
            "yearly": 0,
        },
        "avg": {
            "daily": {
                "all": 0,
                "yearly": 0,
            },
        },
    },
    "arr": {
        "all": [],
        "yearly": [],
    },
}

repos: list[Any] = []
repos_total: int


#


page: int = 1
more: bool = True

while more:
    url: str = f"https://api.github.com/users/{user}/repos?per_page=100&page={page}"
    response: list[Any] = fetch_json(url, gh_headers)
    repos.extend(response)
    more = len(response) == 100
    page += 1

repos_total = len(repos)


def normalize_contribs(arr: list[int]) -> list[int]:
    no_zero: list[int] = [num for num in arr if num > 0]
    min_val: int = min(no_zero)
    max_val: int = max(arr)

    def normalize(num: int) -> int:
        if num == 0: return 0
        return round(((num - min_val) / (max_val - min_val)) * 4 + 1)

    return [normalize(num) for num in arr]


def get_contribs_streak(arr: list[int]) -> int:
    max_streak: int = 0
    current_streak: int = 0

    for num in arr:
        if num != 0:
            current_streak += 1
            if current_streak > max_streak: max_streak = current_streak
        else:
            current_streak = 0

    return max_streak


def get_contribs_query(
    from_date: str | None = None,
    to_date: str | None = None
) -> str:
    return f'''
{{
  user(login: "{user}") {{
    contributionsCollection{f'(from: "{from_date}", to: "{to_date}")' if from_date and to_date else ''} {{
      contributionCalendar {{
        totalContributions
        weeks {{
          contributionDays {{
            date
            contributionCount
          }}
        }}
      }}
    }}
  }}
}}
'''


# Repositories' data

print("Fetching GitHub repositories data...")

for repo in repos:
    for lang, lang_bytes in fetch_json(repo["languages_url"], gh_headers).items():
        lang_data["total"] += lang_bytes
        lang_data["perByte"][lang] = lang_data["perByte"].get(lang, 0) + lang_bytes

lang_data["perByte"] = dict(sorted(lang_data["perByte"].items(), key=lambda item: item[1], reverse=True))

for lang, lang_bytes in lang_data["perByte"].items():
    percent: float = round(lang_bytes / lang_data["total"] * 100, 2)
    lang_data["perCent"][lang] = percent

    if percent < 1.0:
        other = lang_data["frontEnd"].get("Other", {"percent": 0, "bytes": 0})
        other["percent"] += percent
        other["bytes"] += lang_bytes
        lang_data["frontEnd"]["Other"] = other

    else:
        lang_data["frontEnd"][lang] = {
            "name": lang,
            "percent": percent,
            "bytes": lang_bytes,
            "icon": f'<i class="overview" data-i="{lang}"></i>',
        }

lang_data_top_5_arr: dict = list(lang_data["frontEnd"])[:5]
lang_data_top_5_sum: float = sum(
    math.sqrt(lang_data["frontEnd"][n]["percent"])
    for n in lang_data_top_5_arr
)

write_txt_file(
    os.path.join(script_dir, "langs.json"),
    json.dumps({
        n: {
            **lang_data["frontEnd"][n],
            "percentScaled": (
                math.sqrt(lang_data["frontEnd"][n]["percent"])
                / lang_data_top_5_sum
                * 100.
            ),
        } for n in lang_data_top_5_arr
    }),
)


# Contribution calendar

print("Fetching GitHub contributions data...")

def fetch_contribs_ranged(from_date: str = "", to_date: str = "") -> list[Any] | None:
    response: requests.Response = requests.post(
        "https://api.github.com/graphql",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {pat}"
        },
        data=json.dumps({"query": get_contribs_query(from_date, to_date)})
    )

    if response.status_code == 200:
        contributions: list[Any] = []
        for weeks in response.json()["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"]:
            contributions.extend(weeks["contributionDays"])

        return contributions
    else:
        response.raise_for_status()


def fetch_contribs_all() -> list[Any] | None:
    all_contributions: list[Any] = []

    for year in range(start_year, datetime.now(timezone.utc).year + 1):
        all_contributions.extend(fetch_contribs_ranged(
            f"{year}-01-01T00:00:00Z",
            f"{year}-12-31T23:59:59Z"
        ))

    return all_contributions[
        next((i for i, item in enumerate(all_contributions) if item['contributionCount'] > 0), None)
        :
        next((i for i, item in enumerate(all_contributions) if item['date'] == datetime.now(timezone.utc).strftime('%Y-%m-%d')), len(all_contributions) - 1)
        + 1
    ]


def format_contribs(contribs: list[Any]) -> list[int]:
    contribs_arr: list[int] = []

    for day in contribs:
        contribs_arr.append(day["contributionCount"])

    return contribs_arr


def update_contribs_data(contribs: Any, type: str) -> None:
    contribs_data["days"][type] = len(contribs)

    contribs_data["stats"]["highest"][type] = max(contribs)
    contribs_data["stats"]["total"][type] = sum(contribs)

    contribs_data["stats"]["avg"]["daily"][type] = round(contribs_data["stats"]["total"][type] / contribs_data["days"][type], 2)

    contribs_data["stats"]["streaks"][type] = get_contribs_streak(contribs)

    contribs_data["arr"][type] = normalize_contribs(contribs)


update_contribs_data(format_contribs(fetch_contribs_all()), "all")
update_contribs_data(format_contribs(fetch_contribs_ranged()), "yearly")

write_txt_file(os.path.join(script_dir, "contribs-yearly.json"), json.dumps(contribs_data["arr"]["yearly"]))
write_txt_file(os.path.join(script_dir, "contribs.json"), json.dumps(contribs_data))

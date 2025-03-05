import os
import requests
import zipfile
from dotenv import load_dotenv
from utils import cp


load_dotenv()

if not os.getenv("GH_PAT_EXT") or not os.getenv("SITE_EXT"):
    print("Error: GH_PAT_EXT or SITE_EXT is not set", file=sys.stderr)
    sys.exit(0)


repo: str = os.getenv("SITE_EXT")
pat: str = os.getenv("GH_PAT_EXT")


response: requests.Response = requests.get(
  f"https://api.github.com/repos/{repo}/zipball",
  headers={
    "Accept": "application/vnd.github+json",
    "Authorization": f"Bearer {pat}",
    "X-GitHub-Api-Version": "2022-11-28",
  }
)
response.raise_for_status()


temp_dir: str = "TEMP"
os.makedirs(temp_dir, exist_ok=True)

zip_path: str = os.path.join(temp_dir, "repo.zip")


with open(zip_path, "wb") as file:
    file.write(response.content)

with zipfile.ZipFile(zip_path, "r") as zip_ref:
    zip_ref.extractall(temp_dir)


cp(os.path.join(temp_dir, os.listdir(temp_dir)[0]), os.getcwd())

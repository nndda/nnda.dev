import os
import shutil
import requests
from typing import Optional, Any


def write_txt_file(file_path: str, content: str) -> None:
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(content)


def fetch_json(url: str, headers: Optional[dict[str, str]] = None) -> Any | None:
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()


def cleanup_dir(cleanup_path: str) -> None:
    for entry in os.scandir(cleanup_path):
        if entry.is_file() and (
            entry.name.endswith(".js") or
            entry.name.endswith(".json")
        ):
            print("Removing:", entry.name)
            os.remove(os.path.join(cleanup_path, entry.name))


def cp(target: str, dest: str) -> None:
    for item in os.listdir(target):
        a: str = os.path.join(target, item)
        b: str = os.path.join(dest, item)

        if os.path.isdir(a):
            if os.path.exists(b):
                cp(a, b)
            else:
                shutil.copytree(a, b)
        else:
            shutil.copy2(a, b)
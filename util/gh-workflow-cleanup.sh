#!/bin/bash

if [[ -f "./.env" ]]; then
  source "./.env"
fi

remove_run() {
  curl -L \
    -X DELETE \
    -H "Authorization: Bearer $GH_PAT" \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "https://api.github.com/repos/$SITE_REPO/actions/runs/$1"
}

get_runs() {
  curl -sL \
    -H "Authorization: token $GH_PAT" \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "https://api.github.com/repos/$SITE_REPO/actions/workflows/$1/runs?per_page=100&page=$2"
}

queued_workflow=()

while read -r workflow; do

  workflow_name="$(jq -r ".name" <<< "$workflow")"
  workflow_id="$(jq -r ".id" <<< "$workflow")"

  current_page=1

  echo "Processing workflow: '$workflow_name'..."

  while :; do
    workflow_runs="$(get_runs "$workflow_id" "$current_page")"

    if [[ "$(jq ".workflow_runs | length" <<< "$workflow_runs")" -eq 0 ]]; then
      break
    fi

    while read -r runs; do
      # status=$(echo $runs | jq ".status")

      # if [[ \
      #     "$status" != "\"queued\"" || \
      #     "$status" != "\"pending\"" || \
      #     "$status" != "\"waiting\"" || \
      #     "$status" != "\"in_progress\"" \
      #   ]]; then
        if [ "$(($(date -d "$(echo $runs | jq ".updated_at" | tr -d "\"")" +%s) - $(date +%s)))" -ge 259200 ]; then # 3 days
          queued_workflow+=("$(jq -r '.id' <<< "$runs")")
        fi
      # fi
    done < <(jq -c ".workflow_runs[]" <<< "$workflow_runs")

    ((current_page++))
  done

done < <(curl -sL \
  -H "Authorization: token $GH_PAT" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/$SITE_REPO/actions/workflows" \
  | jq -c ".workflows[]"
)

for run_id in "${queued_workflow[@]}"; do
  echo "Removing workflow: $run_id"
  remove_run "$run_id"
done
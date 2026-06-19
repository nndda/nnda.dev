# cant escape node
FROM node:26.3.1-trixie

WORKDIR /nnda.dev

COPY \
  package.json \
  bun.lock \
  config/requirements.txt \
  ./

SHELL [ "/bin/bash", "-c" ]

RUN apt update && \
    apt install -y --no-install-recommends \
    curl \
    git \
    ca-certificates \
    python3 \
    python3-pip \
    python3-venv \
    unzip \
    && rm -rf /var/lib/apt/lists/* \
    && ln -s /usr/bin/python3 /usr/bin/python

# Bun
RUN curl -fsSL https://bun.com/install | bash -s "bun-v1.3.14"

ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

RUN bun ci

# Python
RUN python -m venv . && \
  source ./bin/activate && \
  pip install -r requirements.txt

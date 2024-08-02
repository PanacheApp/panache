# Panache

> _Shaping a Digital Renaissance._

## Introduction

Panache is an open-source everything-app, made to free you from the shackles of big tech.

## Features

> [!WARNING]
>
> Panache is a **Work In Progress**.
>
> We are working on a stable release, and we are looking for contributors to help us.

- Panache Emails: Send and receive emails
- Panache Calendar: Manage your schedule
- Panache Drive: Store and share files
- Panache Social: Connect with friends, family, colleagues, and more
- Panache Teams: Collaborate with your team
- Panache Business: Manage your business

## FAQ

### Why is it called Panache?

Panache is a French word that means "flamboyant confidence of style or manner". We believe that Panache is the perfect name for our project, as it embodies our vision of a digital renaissance.

### Is it truly open-source?

Yes, it is.

Panache is licensed under the [AGPL-3.0](https://github.com/panacheapp/panache/blob/main/LICENSE) license, which means you are free to use, modify, and distribute the source code as long as you provide the same rights to others.

In other words, you can use Panache for free when self-hosting, and you can also modify the source code to suit your needs. However, if you distribute the modified source code, you must also provide the same rights to others.

This license is approved by the [Free Software Foundation](https://www.gnu.org/licenses/license-list.html) and the [Open Source Initiative](https://opensource.org/licenses).

### Who is behind Panache?

Panache is the initiative of [Alexis Bouchez](https://linkedin.com/in/alexisbcz), a French entrepreneur and software developer. He is the co-founder of [Valyent](https://valyent.dev), a startup company building open-source software for developers.

## Installation

1. Clone the repository

```bash
git clone https://github.com/panacheapp/panache.git
```

2. Install the dependencies

```bash
npm install
```

3. Configure the environment

```bash
cp .env.example .env
```

Then, open the `.env` file and configure the environment variables.

4. Run Docker Compose to start the required services

```bash
docker compose up -d
```

5. Start the development server

```bash
npm run dev
```

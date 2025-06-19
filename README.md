<p align="center">
  <img alt="i-am-very.gay Banner" src="https://raw.githubusercontent.com/Mkeko-team/i-am-very.gay/main/media/banner.png">
</p>

<p align="center">
  <img alt="Open Issues" src="https://img.shields.io/github/issues-raw/Mkeko-team/i-am-very.gay?color=ff66c4&label=issues&style=for-the-badge">
  <img alt="Pull Requests" src="https://img.shields.io/github/issues-pr-raw/Mkeko-team/i-am-very.gay?color=ff66c4&label=pull%20requests&style=for-the-badge">
</p>

<h1 align="center">i-am-very.gay</h1>

<p align="center">
  💖 <strong>i-am-very.gay</strong> gives developers clean and expressive subdomains under <code>.i-am-very.gay</code> — for personal sites, portfolios, tools, and more.
</p>

---

# i-am-very.gay Subdomain Registry

Welcome to the **i-am-very.gay** subdomain registry! This is a modern, community-driven, and safe way to get your own subdomain under i-am-very.gay.

---

## 🚀 How to Request a Subdomain

1. **Fork this repository**
2. **Create a file** in the `/domain` folder named after your subdomain (e.g., `yourname.json`):

   ```json
   {
     "request": {
       "sub": "subdomain",
       "owner": {
         "gh": "yourgithubuser",
         "contact": ""
       },
       "dns": [
         {
           "kind": "a",
           "content": "1.2.3.4",
           "proxy": false,
           "ttl": 0
         }
       ]
     }
   }
   ```

   - `kind`: DNS record type, **lowercase** (e.g., `a`, `aaaa`, `txt`, `cname`)
   - `content`: The value for your DNS record
   - `proxy`: `true` for proxied (no `ttl` needed), `false` for DNS only
   - `ttl`: `0` for automatic, or a number (in seconds, e.g., `3600` for 1 hour)

3. **Open a Pull Request**
   - Your PR will be automatically checked for correct format and rules.
   - If there are errors, GitHub will show them in the PR checks.
   - Only valid requests will be considered for merging.

4. **Wait for review**
   - An owner/admin will review and merge valid requests.
   - We do not auto-merge for safety and moderation.

---

## 🛡️ Safety & Moderation
- All requests are reviewed by a human before being merged.
- Automated tests check for valid format, ownership, and subdomain rules.
- No secrets or API keys are exposed in any workflow or PR.
- Abuse, spam, or malicious requests will be rejected.

---

## 📝 Rules & Validation
- Only one subdomain per user (unless otherwise approved).
- No nested subdomains unless you own the parent.
- No NS records for nested subdomains unless allowed and justified.
- Only valid DNS record types and values are accepted.
- See the test suite for all enforced rules.

---

## ❓ Questions or Issues?
Open an issue or discussion in this repo. For privacy or sensitive matters, contact the repo owner directly.

---

**This project is for the i-am-very.gay community. Please be respectful and follow the rules!**

---

## ⚙️ NS Records Policy

We restrict NS records for stability and abuse prevention. If you really need them:
- Explain **why** in your pull request
- Give clear usage examples

If it's not solid, it won't be merged. Most DNS setups work without NS records — we support A, AAAA, CNAME, MX, TXT, and more.

---

## 🧠 Stay Connected

For live updates, downtime notices, or community questions — join our Discord.

<p align="center">
  <a href="https://discord.gg/8xmwCQkW8g">
    <img src="https://discord.com/api/guilds/1367837016280272978/widget.png?style=banner2" alt="Discord Server">
  </a>
</p>

> We post major incidents here on GitHub, but most updates happen on Discord first.

---

## 🚨 Report Abuse

Spotted malicious, harmful, or illegal use of a subdomain?

📩 [Open an abuse report](https://github.com/Mkeko-team/i-am-very.gay/issues/new?assignees=&labels=report-abuse&template=report-abuse.md&title=Report+abuse)

We'll review and remove anything that violates our policies or law.

---

## ☁️ Powered by Cloudflare

We proudly use [Cloudflare](https://www.cloudflare.com/) for blazing-fast DNS, SSL, and global delivery.

<p align="center">
  <a href="https://www.cloudflare.com">
    <img src="https://raw.githubusercontent.com/is-a-dev/register/main/media/cloudflare.png" height="80" alt="Cloudflare">
  </a>
</p>

---

## 📜 License

- All project code is under the [MIT License](LICENSE)
- Subdomain entries submitted by users are considered public domain (CC0)

You're free to use, fork, or remix — just don't be evil.

---

**Made with 🩷 by Mkeko and Fynn **

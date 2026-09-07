# Security Policy

## Supported Versions

Glass Toast is currently under active development.

At this stage, security fixes are focused on the latest development version.

| Version   | Supported |
| --------- | --------- |
| `0.1.x`   | Yes       |
| `< 0.1.0` | No        |

Once stable releases are available, this table will be updated to reflect supported versions.

## Reporting a Vulnerability

Please do not report security vulnerabilities through public GitHub issues.

If you believe you have discovered a security vulnerability in Glass Toast, please report it privately to the project maintainer.

When reporting a vulnerability, provide:

* A clear description of the vulnerability.
* Steps to reproduce the issue.
* The affected version.
* The affected platform.
* The potential impact.
* A possible mitigation, if known.

Providing a minimal reproduction or proof of concept can help us investigate the issue more quickly.

## What Happens After a Report

After receiving a security report, the maintainers will:

1. Review the report.
2. Attempt to reproduce the issue.
3. Assess its severity and impact.
4. Determine an appropriate fix.
5. Prepare and test the fix.
6. Release a patched version when necessary.
7. Document the issue appropriately.

The exact response time may vary depending on the complexity and severity of the vulnerability.

## Security Best Practices for Users

Glass Toast is a UI library and should not be used as a security boundary.

Applications using Glass Toast should continue to handle:

* Authentication.
* Authorization.
* Input validation.
* Sensitive data.
* Network security.
* Server-side validation.

Toast notifications should never be considered a mechanism for protecting sensitive information.

Avoid displaying secrets, access tokens, passwords, private keys, or other sensitive information inside toast messages.

## Disclosure

Security vulnerabilities should be disclosed responsibly.

We may publish security information after a fix is available when disclosure is appropriate and does not unnecessarily expose users to additional risk.

# BSI Secvisogram CSAF 2.0 Web Editor

<!-- TOC depthFrom:2 depthTo:3 -->

- [Introduction](#introduction)
- [Getting started](#getting-started)
- [How to use Secvisogram](#how-to-use-secvisogram)
  - [Basic concepts](#basic-concepts)
  - [Form Editor](#form-editor)
  - [JSON Editor](#json-editor)
  - [Preview (HTML view)](#preview-html-view)
  - [CSAF Document (JSON view)](#csaf-document-json-view)
- [Developing Secvisogram](#developing-secvisogram)
  - [Developer Guide, Architecture and Technical Design](#developer-guide-architecture-and-technical-design)
  - [Custom Preview Templates](#custom-preview-templates)
  - [Security Considerations](#security-considerations)

<!-- /TOC -->

## Introduction

Secvisogram is a tool for creating and editing advisories in [CSAF format](https://github.com/oasis-tcs/csaf/blob/master/csaf_2.0/json_schema/csaf_json_schema.json).

Secvisogram is inspired by the project [Vulnogram](https://vulnogram.github.io/) - "a tool for creating and editing CVE information in CVE JSON format". Both names share the same Greek suffix '-gram' which is used for denoting something written or recorded in a particular way. Vulnerability-related information is often not enough - mostly, only the remediation information enables the end user to act efficiently in responding to these concerns.

Secvisogram aims to make it easier for vendors and other security advisory issuing parties to record the advisory details in the CSAF format.

![Secvisogram CSAF Editor Screenshot](README-screenshot.png)

## Getting started

Assure that you have **Node 14 (LTS) and npm 6 or newer** installed.
[Nodesource](https://github.com/nodesource/distributions/blob/master/README.md) provides binary distributions for various Linux distributions.

      $ node --version ; npm --version
      v14.15.4
      6.14.10

Check out the repository and navigate to the working directory.

    git clone git@github.com:secvisogram/secvisogram.git
    cd secvisogram

This repository includes git submodules for vendor modules like [Ace](https://ace.c9.io/). Make sure to initialize and update the submodules before you start to work with the repository.

    git submodule update --init --recursive

Afterwards, the npm dependencies need to be installed.

    npm ci

Now you can start a development server as follows:

    npm run dev

The application is now running and accessible at http://localhost:8080.

#### Deploying to Production

Please refer to [`DEVELOPMENT.md`](DEVELOPMENT.md) for a detailed description on how to build and deploy Secvisogram in production.

## How to use Secvisogram

### Basic concepts

Similar to the Vulnogram model, the web application consists of various tabs that represent the individual views. These are represented as an HTML page which loads its data from a local browser storage using JavaScript.

To start a new document after saving, click the "New" button. Alternatively, click the "Open" button to select and load a local file.

When leaving a view without saving, e.g. reloading the application, a warning is displayed, and the user must confirm prior to leaving the page.

### Form Editor

The _Form Editor_ view is an HTML form with live input validation. Additionally, the CSAF JSON Schema checks the following constraints:

- Language fields in the form are checked for plausibility against the values from the IANA database
- The consistency of CVSS string and accompanying fields is checked
- The consistency of the CWE ID and description is checked

CVSS 3 input fields are completed with the data from a possibly copied vector string and their values are recalculated. This gives the user an elegant way to use a possibly existing and copied CVSS 2.0 vector and to partially adjust the values.

A special input field is the "CWE" attribute. Here you can search the CWE catalog (XML file) by entering a value in the "id" or "name" field. For this purpose, a list with the first ten entries matching the input opens under the respective input field, from which a suitable entry can be selected and accepted.

Input errors are displayed directly alongside the respective form field. A global issue counter and validity symbol indicates the current overall validation status. Clicking _Show errors_ reveals a panel with all validation issues and allows to inspect and directly jump to the respective fields.

_Opening & Saving Files_
You can open and save your CSAF JSON document at any time using the respective _Open_ and _Save_ buttons. If your document fails the validation checks, a confirmation dialog will appear.

The _CSAF Document_ tab offers functionality to extract the standard-valid subset of your current document.

_Identifying & Solving Validation issues_
Use the `Show errors`-link in the Form Editor view to reveal a linked list of validation issues. Here you can click on any validation issue and directly jump to the affected form elements.

### JSON Editor

The _JSON Editor_ view uses the ACE editor to edit the JSON representation of the current CSAF document. Please note that only valid JSON content is accepted for further processing.

### Preview (HTML view)

This view does not include any editing functionality. It displays a rendered HTML template view of the current CSAF document as shown in the editor views.

Use the toggle button to switch between the Rendered web view and the HTML source view. You can export this HTML document via _Export Preview_ as a standalone HTML document or print the rendered document via _Print Preview_.

### CSAF Document (JSON view)

This view does not include any editing functionality. It **always displays the valid subset of your current CSAF document** by removing any invalid and/or empty CSAF document elements.

You can use this view and the embedded _Export CSAF_ button to always quickly extract the standard-valid subset of your current CSAF document.

## Developing Secvisogram

### Developer Guide, Architecture and Technical Design

The [`DEVELOPMENT.md`](DEVELOPMENT.md) document gives an overall introduction on how to get started with developing Secvisogram as well as an overview on the architecture, libraries used and technical design of Secvisogram.

### Custom Preview Templates

It's possible to change and provide custom Preview Templates. Please refer to [`PREVIEW-TEMPLATING.md`](PREVIEW-TEMPLATING.md) for detailed instructions on how to create, modify and deploy Secvisogram with custom templates.

### Security Considerations

Please refer to [`SECURITY-CONSIDERATIONS.md`](SECURITY-CONSIDERATIONS.md) for details about how Secvisogram addresses the [OWASP Top 10 Web Application Security Risks](https://owasp.org/www-project-top-ten/).

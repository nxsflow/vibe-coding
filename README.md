# nexflow.it – App

This is the note taking app that helps you nurture your relationships and achieve your goals.

## Manual preparation

The following things need to be manually prepared so that the app works properly.

### Customized domain

The app expects to run on the domain `app.nexflow.it`. It makes things easier when their is a Route 53 Hosted Zone for this domain. In my domain provider I add AWS Route 53 as my external nameserver.

Once the app is hosted on Amplify, I added `app.nexflow.it` as a custom domain. I also enabled the firewall and removed access to the Amplify original domain (`amplifyapp.com`).

### Email (SES)

In SES I create an Email identity for the sender Email `notifications@nxsflow.com` and for the domain `nxsflow.com`. I created a Route 53 Hosted Zone for this domain as well in order to simplify the creation of DNS records for the domain identity. I also created a configuration set and added it to the domain identity. It helps gets insights on reputation and archive sent emails.

For the production account I also requested production access for SES.

### TipTap Pro Extensions

You need to add this line to `~/.zshrc`:

```zsh
export TIPTAP_PRO_TOKEN=THE_TOKEN
```

Replace `THE_TOKEN` with the token you find on the [TipTap Settings](https://cloud.tiptap.dev/pro-extensions).

When deploying to AWS Amplify make sure you add `TIPTAP_PRO_TOKEN` as an environment variable so the TipTap Pro packages can be installed when deploying changes.

## Development

Run the development server:

```zsh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

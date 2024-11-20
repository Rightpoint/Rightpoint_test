# Testing

When you execute `yarn test` at project's root Turborepo will run the `test` script within each package/project.

## Setting up tests for a project

If you need to setup `jest` for a project, you need to add jest dependencies to `package.json`, a configuration to transform typescript files using the `ts-jest` transform library and a test script to execute `jest`.

```json
{
    ...
    "scripts": {
        "test": "jest"
    },
    ...
    "devDependencies": {
        ...
        "jest": "^27.4.7",
        "ts-jest": "^27.1.2",
        "typescript": "4.7.4",
    },
    ...
    "jest": {
        "transform": {
            "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
        }
    }
}
```

If you are testing react, add the `jsdom` test environment to Jest's config:

```json
{
    ...
    "jest": {
        "transform": {
            "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
        },
        "testEnvironment": "jsdom"
    }
}
```

## End-to-end testing

End to End testing is done on remote CI pipelines, but can be executed locally as well.

### Pointing to a remote site

There is an environment variable you can define to define the target site that will be tested, so you can test a remote deployment. Add the `--env TARGET_SITE_URL=<url>` option to the testing command to define a different URL to be tested. For example:

```sh
yarn test:e2e --env TARGET_SITE_URL=https://rightpoint.com
```

### Running on WSL2

**This section is WORK IN PROGRESS, most steps are covered but it is not a complete solution.**

On Windows, install VcXsrv: https://sourceforge.net/projects/vcxsrv/

On your linux instance, install the following packages:

```sh
sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```

Grant passwordless access for dbus by modifying the next file and add your username with no-password access

```sh
sudo visudo -f /etc/sudoers.d/dbus
```

The line you need to add is something like:

```
<your_username> ALL = (root) NOPASSWD: /etc/init.d/dbus
```

Modify your `.bashrc` file to include these lines:

```sh
# set DISPLAY variable to the IP automatically assigned to WSL2
export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0

# Automatically start dbus
sudo /etc/init.d/dbus start &> /dev/null
```

Note that you may need to `unset DISPLAY` in order to successfully run the `yarn cypress verify` command.

To make this change to take effect, you will need to restart your terminal or include the `.bashrc` as source.

```sh
. .bashrc
```

Run VcXsrv by launching the `XLaunch` program.

If you have doubts, refer to this guide: https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress

#### Troubleshooting

If you cypress installation is failing to verify, and you are using WSL2, try to `unset DISPLAY`.

If you are not able to connect to VcXsrv, take a look at your firewall rules. The inbound rules should allow vcxsrv.exe to receive traffic. Check if there is not already a rule blocking it. Another possible solution without modifying the firewall rules may be this one (not verified): https://github.com/microsoft/WSL/issues/4793#issuecomment-588321333

At some point you may need to clear cache and re-install cypress, you can use the following commands for that:

```sh
npx cypress cache clear
npx cypress install
```

If you need to debug, enable debugging with:

```sh
# Linux
DEBUG=cypress:* cypress run

# Windows command line
set DEBUG=cypress:*
cypress run
```

For more information, visit the [troubleshooting page](https://docs.cypress.io/guides/references/troubleshooting).

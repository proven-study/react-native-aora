# Aora

- Figma: <https://www.figma.com/file/44qYc07upgNUytanb9Gl5Z/Aora---(dev-mode%2C-updated-14-Apr%2C-2024)?type=design&node-id=0%3A1&mode=dev>

## Build apk

```bash
yarn build:apk
```

> It will generate `.aab` file in <https://expo.dev>

Now for generating `.apk` file, need to download bundletool.jar file from <https://github.com/google/bundletool/releases>. Then put the `.aab` file and `bundletool.jar` file in the same directory and run the following command in terminal in that directory:

```bash
java -jar bundletool.jar build-apks --bundle=filename.aab --output=newfilename.apks --mode=universal

## For our case
java -jar bundletool-all-1.16.0.jar build-apks --bundle=aora-v-0.0.1.aab --output=aora-v-0.0.1.apks --mode=universal
```

> Need to change jar file name and aab file name accordingly.

After running the above command, it will generate a `.apks` file. Now run the following command to generate `.apk` file:

```bash
java -jar bundletool.jar install-apks --apks=newfilename.apks --device-id=emulator-5554
```

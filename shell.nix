{
  pkgs ? import <nixpkgs> {
    config = {
      allowUnfree = true;
      android_sdk.accept_license = true;
    };
  },
}:

let
  androidComposition = pkgs.androidenv.composeAndroidPackages {
    platformVersions = [
      "36"
      "35"
      "34"
    ];
    buildToolsVersions = [
      "36.0.0"
      "35.0.0"
      "34.0.0"
    ];
    includeEmulator = false;
    includeNDK = false;
  };
  androidSdk = androidComposition.androidsdk;
in
(pkgs.buildFHSEnv {
  name = "capacitor-android-env";
  targetPkgs =
    pkgs: with pkgs; [
      androidSdk
      jdk21
      nodejs
      glibc
      zlib
      ncurses5
      stdenv.cc.cc.lib
    ];
  profile = ''
    export ANDROID_HOME="${androidSdk}/libexec/android-sdk"
    export ANDROID_SDK_ROOT="$ANDROID_HOME"
    export JAVA_HOME="${pkgs.jdk21.home}"
    export PATH="$ANDROID_HOME/platform-tools:$PATH"
  '';
  runScript = "bash";
}).env

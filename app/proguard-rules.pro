# Add project specific ProGuard rules here.
-keepclassmembers class fqcn.of.javascript.interface.for.webview {
   public *;
}

# Keep WebView JavaScript interface
-keepattributes JavascriptInterface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
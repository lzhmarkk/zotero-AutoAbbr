import { config } from "../../package.json";

export async function registerPrefsScripts(_window: Window) {
  // This function is called when the prefs window is opened
  // See addon/chrome/content/preferences.xul onpaneload
  if (!addon.data.prefs) {
    addon.data.prefs = {
      window: _window,
    };
  } else {
    addon.data.prefs.window = _window;
  }

  bindPrefEvents();
}

function bindPrefEvents() {
  addon.data
    .prefs!.window.document.querySelector(
      `#zotero-prefpane-${config.addonRef}-button-edit`,
    )
    ?.addEventListener("click", (e) => {
      ztoolkit.log("Edit rule file");
      Zotero.launchFile(addon.data.ruleManager!.fp.filename);
    });

  addon.data
    .prefs!.window.document.querySelector(
      `#zotero-prefpane-${config.addonRef}-button-update`,
    )
    ?.addEventListener("click", async (e) => {
      ztoolkit.log("Update rule file");
      await addon.data.ruleManager!.load();
    });

  addon.data
    .prefs!.window.document.querySelector(
      `#zotero-prefpane-${config.addonRef}-button-reset`,
    )
    ?.addEventListener("click", async (e) => {
      ztoolkit.log("Reset rule file");
      await addon.data.ruleManager!.reset();
    });
}

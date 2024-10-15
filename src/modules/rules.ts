import { Publication } from "./abbreviation";
import { config } from "../../package.json";
import FileHandler from "./FileHandler";
import { getString } from "../utils/locale";

export class RuleManager {
  fp: FileHandler;
  rules: Publication[];

  constructor() {
    const filename = "zoteroabbr.json";
    this.fp = new FileHandler(filename);
    this.fp.lock.promise;
    this.rules = [];
  }

  async get_default() {
    const default_mapping_file = `chrome://${config.addonRef}/content/ccf.json`;
    const response = await fetch(default_mapping_file);
    return await response
      .text()
      .then((txt) => JSON.parse(txt));
  }

  async reset() {
    // todo confirm dialog
    ztoolkit.getGlobal("alert")("Load default Rules");
    const default_rules = await this.get_default();
    this.rules = default_rules;
    await this.fp.save(default_rules);

    new ztoolkit.ProgressWindow(config.addonName, {
      closeOnClick: true,
      closeTime: 3000,
    })
      .createLine({
        text: getString("rule-reset-finish"),
        type: "default",
        progress: 100,
      })
      .show();
  }

  async load() {
    try {
      this.rules = await this.fp.load();
    } catch {
      await this.reset();
    }

    new ztoolkit.ProgressWindow(config.addonName, {
      closeOnClick: true,
      closeTime: 3000,
    })
      .createLine({
        text: getString("rule-update-finish"),
        type: "default",
        progress: 100,
      })
      .show();
  }
}

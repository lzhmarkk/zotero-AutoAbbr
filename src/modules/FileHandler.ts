class FileHandler {
  public filename: string;
  public lock: _ZoteroTypes.DeferredPromise<unknown>;

  constructor(filename: string) {
    const temp = Zotero.getStorageDirectory();
    this.filename = PathUtils.join(
      temp.path.replace(temp.leafName, ""),
      filename,
    );

    this.lock = Zotero.Promise.defer();
    this.lock.resolve();
  }

  async load() {
    const rawString = (await Zotero.File.getContentsAsync(
      this.filename,
    )) as string;
    return JSON.parse(rawString);
  }

  async save(content: any) {
    await this.lock.promise;
    Zotero.getMainWindow().setTimeout(async () => {
      await Zotero.File.putContentsAsync(
        this.filename,
        JSON.stringify(content),
      );
    });
  }
}

export default FileHandler;

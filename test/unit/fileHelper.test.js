import { describe, test, expect, jest } from "@jest/globals";
import fs from "fs";
import FileHelper from "../../src/fileHelper.js";
import Routes from "../../src/routes.js";

describe("#FileHelper", () => {
  describe("#getFileStatus", () => {
    test("it should return files statuses in correct format", async () => {
      const statMock = {
        dev: 2049,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 13262372,
        size: 182004,
        blocks: 360,
        atimeMs: 1631130390463.9182,
        mtimeMs: 1631130390214,
        ctimeMs: 1631130390211.9138,
        birthtimeMs: 1631130359455.3867,
        atime: "2021-09-08T19:46:30.464Z",
        mtime: "2021-09-08T19:46:30.214Z",
        ctime: "2021-09-08T19:46:30.212Z",
        birthtime: "2021-09-08T19:45:59.455Z",
      };

      const mockUser = "luccas";
      const filename = "file.png";
      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename]);

      jest
        .spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock);

      const result = await FileHelper.getFilesStatus("/tmp");

      process.env.USER = mockUser;

      const expectedResult = [
        {
          size: "182 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`);
      expect(result).toMatchObject(expectedResult);
    });
  });
});

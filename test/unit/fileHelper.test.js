import { describe, test, expect, jest } from "@jest/globals";
import fs from "fs";
import Routes from "../../src/routes.js";

describe("#FileHelper", () => {
  describe("#getFileStatus", () => {
    test.todo("it should return files statuses in correct format", () => {
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

      const mockUser = "luccasbarros";
      const filename = "file.png";
      process.env.USER = mockUser;

      const expectedResult = [
        {
          size: "18 kb",
          birthtime: statMock.birthtime,
          owner: mockUser,
          file: filename,
        },
      ];
    });
  });
});

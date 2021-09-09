import { describe, test, expect, jest } from "@jest/globals";
import Routes from "../../../../aula02/gdrive-webapi/src/routes.js";
import UploadHandler from "../../src/uploadHandler.js";
import TestUtil from "../_util/testUtil.js";

describe("#UploadHandler test suite", () => {
  const ioObj = {
    to: (id) => ioObj,
    emit: (event, message) => {},
  };
  describe("#registerEvents", () => {
    test("should call onFile and onFinish functions on Busboy instance", () => {
      const uploadHandler = new UploadHandler({
        io: ioObj,
        socketId: "0",
      });

      jest.spyOn(uploadHandler, uploadHandler.onFile.name).mockResolvedValue();

      const headers = {
        "content-type": "multipart/form-data; boundary=",
      };
      const onFinish = jest.fn();
      const busboyIntance = uploadHandler.registerEvents(headers, onFinish);

      const fileStream = TestUtil.generateReadableStream([
        "chunk",
        "of",
        "data",
      ]);
      busboyIntance.emit("file", "fieldname", fileStream, "filename.txt");
      busboyIntance.listeners("finish")[0].call();
      expect(uploadHandler.onFile).toHaveBeenCalled();

      expect(onFinish).toHaveBeenCalled();
    });
  });
});

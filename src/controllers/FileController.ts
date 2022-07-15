import fs from "fs"

export const getGeneratedPdf = (req: any, res: any) => {
    res.send("new" + req.params.path);
}
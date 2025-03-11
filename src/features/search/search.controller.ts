import { NextFunction, Request, Response } from "express";
import { PythonShell } from "python-shell";
import path from "path";
import APIResponse from "../../utils/response";
import { SearchInputs } from "./search.validation";

export default class SearchController {
  static scrapeJobs = async (
    req: Request<{}, {}, SearchInputs>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, location } = req.query;

      // Resolve the path to the Python script
      const scriptPath = path.join(__dirname, "../search/scrapers");

      const options = {
          scriptPath,
          args: [String(title), String(location || "")],
          pythonPath: "python",
      };

      // Execute the Python script
      PythonShell.run("__init__.py", options).then(results => {
        console.log("successful srapping");
        // Convert the list of strings into a single JSON string
        const jsonString = results.join("");
        try {
          // Parse the JSON string into an object
          const jsonData = JSON.parse(jsonString);

          // Extract and return the jobs array
          const jobs = jsonData.jobs || [];

          APIResponse.success(jobs, "Fetched jobs successfully", 200).send(res);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          APIResponse.error("Failed to parse job data", 500).send(res);
        }
      });

    } catch (error) {
      console.error("Controller error:", error);
    //   return next(error)
    } finally{
        console.log("Python process should now exit");
    }
  };
}

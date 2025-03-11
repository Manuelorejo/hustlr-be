# -*- coding: utf-8 -*-
"""
Created on Wed Jan  8 22:36:18 2025

@author: Oreoluwa
"""

# The following block of code consists of the import statements
import json
import sys
import os
# Add the current directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from Linkedln import linkedln
from Jobsguru import Jobsguru
from MyJobMag import MyJobMag
from hotnigerianjobs import hotnigerianjobs
from Jobberman import jobberman

def normalize_value(value):
    """Convert empty or 'Not Specified' values to null"""
    if not value or value == "Not Specified":
        return None
    return value

def main():
    # The following block of code is for initialization of lists and variables
    job_list = []
    # search_term = input("What role are you looking for? ")
    # location = input("Where do you want to work? ")
    # Read arguments instead of input()
    if len(sys.argv) < 3:
        # print("Usage: python script.py <search_term> <location>")
        sys.exit(1)
    
    search_term = sys.argv[1]
    location = sys.argv[2]

    # The following block of code is for function calls
    linkedln_results = linkedln(search_term, location)
    Jobsguru_results = Jobsguru(search_term)
    MyJobMag_results = MyJobMag(search_term, location)
    hotnigerianjobs_results = hotnigerianjobs(search_term)
    jobberman_results = jobberman(search_term, location)

    # The following block of code takes the results of the function calls and appends them to the same list
    for i in linkedln_results:
        job_list.append(i)
    
    for i in Jobsguru_results:
        job_list.append(i)
    
    for i in MyJobMag_results:
        job_list.append(i)
    
    for i in hotnigerianjobs_results:
        job_list.append(i)

    for i in jobberman_results:
        job_list.append(i)

    # Format the job list into the required JSON structure
    formatted_jobs = []
    for job in job_list:
        formatted_job = {
            "job_title": normalize_value(job.get('Job Title')),
            "job_location": normalize_value(job.get('Job Location')),
            "job_link": normalize_value(job.get('Job Link')),
            "job_mode": normalize_value(job.get('Job Mode', job.get('Job_Mode'))),
            "job_source": normalize_value(job.get('Job Source', job.get('Source')))
        }
        formatted_jobs.append(formatted_job)

    # Output the JSON with the required format
    json_output = {"jobs": formatted_jobs}
    print(json.dumps(json_output, indent=2))
    return json_output

if __name__ == "__main__":
    main()
    sys.exit(0)
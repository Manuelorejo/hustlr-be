# -*- coding: utf-8 -*-
"""
Created on Sun Feb  2 14:11:02 2025

@author: Oreoluwa
"""

import requests
from bs4 import BeautifulSoup


search_term = 'Data Scientist'
location = "Nationwide"
base_url = 'https://www.jobberman.com/jobs'

def jobberman(search_term,location):
    url = f'https://www.jobberman.com/jobs?location={location}&q={search_term}'
    
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    
    document = soup.find("main", class_ = 'min-h-screen main-content')
    jobs = document.find_all("div",class_ = "flex flex-grow-0 flex-shrink-0 w-full")
    
    job_list = []
    job_post = {}
    for job in jobs:
        
        try:
            job_title = job.find_all("p")[0].get_text(separator = " ").strip()
            company = job.find_all("p")[1].get_text(separator = " ").strip()
            
            job_post["Job Title"] = job_title + " at " + company
            
        except:
            continue
        
        try:
            job_post["Job Link"] = job.a['href']
        except:
            continue
        
       
        
        job_post["Job Location"] = location
        
        job_post["Job Mode"] = "Not Specified"
        
        job_post['Source'] = "Jobberman.com"
        
        job_list.append(job_post)
    return job_list
    
 

    
'''counter = 1
for job in job_list:
    print("JOB " + str(counter))
    for k,v in job.items():
        counter += 1
        print(k + ": " + v)
        print("\n")
'''
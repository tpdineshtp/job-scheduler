# job-scheduler

Step 1: clone this repository

Step 2: run npm install

Step 3: run npm start

Step 4: Job request sample 

	curl -X POST \
	  http://localhost:8000/job/schedule \
	  -H 'cache-control: no-cache' \
	  -H 'content-type: application/json' \
	  -H 'postman-token: 824f6afe-90f8-fe8d-a02b-c9ea9254a178' \
	  -d '{
		"job_name": "job3",
		"deadline": "5",
		"dependencies": ["job1"]
	}'

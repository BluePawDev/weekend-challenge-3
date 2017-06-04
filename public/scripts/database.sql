-- SELECT * to populate table with all records
SELECT * FROM "tblToDo"

-- INSERT to add new task
INSERT INTO "tblToDo"("txtTask", "dtmDue") VALUES ($1, $2)', [task, due]

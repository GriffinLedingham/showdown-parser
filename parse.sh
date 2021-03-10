# Navigate to replay parser
cd ../replay-parser;

# Delete old parsing logs
rm -r gen8vgc2021series8-2020-12-H2/2020-12-H2-01/ && cp -r log_output/ gen8vgc2021series8-2020-12-H2/2020-12-H2-01/;

# Navigate back to this dir
cd ../showdown-parser;

# Run parsing
node index -f gen8vgc2021series8 -c 0 -d 2020-12-H2 -o usage;
node index -f gen8vgc2021series8 -c 0 -d 2020-12-H2 -o ranking;
node index -f gen8vgc2021series8 -c 0 -d 2020-12-H2 -o json;
node index -f gen8vgc2021series8 -c 0 -d 2020-12-H2 -o usage --no-logs;
node index -f gen8vgc2021series8  -c 0 -d 2020-12-H2 -o ranking --no-logs;
node index -f gen8vgc2021series8   -c 0 -d 2020-12-H2 -o json --no-logs;

# Copy parsing into pikalytics
cp json/gen8vgc2021series8-2020-12-H2-0-json.json ../pikalytics/data/logs_data/2020-12-H2/series8-1760.json;


f = open("ASV2019.txt")
lines = f.readlines()
f.close()
print(lines)

import statistics
eers = [ float(line.strip()) for line in lines if line.strip() != "" ]
print(eers)
print(min(eers),max(eers),statistics.median(eers))

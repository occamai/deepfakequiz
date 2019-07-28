
import os
import sys

# Accumulate a list of fake and true speech clips
fake_forms = []
true_forms = []

# The train file
FILE = "../../DS_10283_3336/LA/ASVspoof2019_LA_cm_protocols/ASVspoof2019.LA.cm.train.trn.txt"
USE_GEN= [ "A03" ] # , "A04" ]
PREFIX = "../../DS_10283_3336/LA/ASVspoof2019_LA_train/flac"

# Open it and load some wave forms 
f = open(FILE)
lines = f.readlines()
f.close()

for line in lines:

	parts = line.strip().split()

	if parts[4] == "spoof" and False:

		if parts[3] in USE_GEN:

			path = os.path.join( PREFIX, parts[1] + ".flac")
			if not os.path.exists(path):
				print("Could not find", path)
				sys.exit(1)
			fake_forms.append( [ "f", path, parts[0], parts[3] ] )

	elif parts[4] == "bonafide":
			
		path = os.path.join( PREFIX, parts[1] + ".flac")
		if not os.path.exists(path):
			print("Could not find", path)
			sys.exit(1)
		true_forms.append( [ "r", path, parts[0], parts[3] ] )


# eval file
FILE = "../../DS_10283_3336/LA/ASVspoof2019_LA_cm_protocols/ASVspoof2019.LA.cm.eval.trl.txt"
USE_GEN= [] # "A07" ]
PREFIX = "../../DS_10283_3336/LA/ASVspoof2019_LA_eval/flac"

# Open it and load some wave forms
f = open(FILE)
lines = f.readlines()
f.close()

for line in lines:

	parts = line.strip().split()

	if parts[4] == "spoof" and False:

		if parts[3] in USE_GEN:

			path = os.path.join( PREFIX, parts[1] + ".flac")
			if not os.path.exists(path):
				print("Could not find", path)
				sys.exit(1)
			fake_forms.append( [ "f", path, parts[0], parts[3] ] )

	elif parts[4] == "bonafide":

		path = os.path.join( PREFIX, parts[1] + ".flac")
		if not os.path.exists(path):
			print("Could not find", path)
			sys.exit(1)
		true_forms.append( [ "r", path, parts[0], parts[3] ] )

# tacotron files
#tacodir = "../../tacotron2-asv-spoof/flac"
tacodir = "../../dc-tts-asv-spoof/flac"
tacos = os.listdir(tacodir)
for taco in tacos:
	path = os.path.join(tacodir, taco )
	if not os.path.exists(path):
		print("Could not find", path)
		sys.exit(1)
	fake_forms.append( ["f", path, "?", "waveform" ] )

print("fake_forms=",len(fake_forms))
print("true_forms=",len(true_forms))

# Create 10 random...
import random
tenran = random.sample( fake_forms + true_forms, 10 )

# Create 10 random pairs (1 f and 1 r)...
tenf = random.sample( fake_forms, 10 )
tenr = random.sample( true_forms, 10 )


print("TEN RANDOM", tenran)

print("TEN FALSE", tenf)

print("TEN REAL", tenr)

# Create the experiment dir...
import time
tm = time.ctime()
tm = tm.replace(" ","_").replace(":","_")
parentdir = "exp_" + tm
os.mkdir(parentdir)
print("MAKING EXPERIMENT = ", parentdir )

# Create the test file...
f = open( os.path.join(parentdir,"TEST.txt"), "w" )
for i in range(len(tenran)):
	f.write("%s,%s,%s\n" % (tenran[i][0], tenran[i][3], tenran[i][1] ))

for i in range(len(tenf)):
	f.write("%s,%s-%s\n" % (tenf[i][3],tenf[i][1],tenr[i][1]) )

f.flush()
f.close()

expdir = os.path.join( parentdir, "exp" )
os.mkdir(expdir)

# Create the script file and object for JSON...
scr = {"1":[], "2":[] }
f = open( os.path.join(expdir, "SCRIPT.txt"), "w" )
for i in range(len(tenran)):
	f.write("%s\n" % ( os.path.basename( tenran[i][1] )) )
	os.system("cp %s %s" % ( tenran[i][1], os.path.join(expdir, os.path.basename( tenran[i][1]) ) ) )
	scr["1"].append( os.path.join(expdir, os.path.basename( tenran[i][1]) ) )

for i in range(len(tenf)):
	rsamp = random.sample([tenf,tenr],2)
	f.write("%s,%s\n" % (os.path.basename(rsamp[0][i][1]),os.path.basename(rsamp[1][i][1]) ))
	os.system("cp %s %s" % ( rsamp[0][i][1], os.path.join(expdir, os.path.basename( rsamp[0][i][1]) ) ) )
	os.system("cp %s %s" % ( rsamp[1][i][1], os.path.join(expdir, os.path.basename( rsamp[1][i][1]) ) ) )
	scr["2"].append( [ os.path.join(expdir, os.path.basename( rsamp[0][i][1]) ), os.path.join(expdir, os.path.basename( rsamp[1][i][1]) ) ] )

f.flush()
f.close()

import json
f = open( os.path.join(expdir, "SCRIPT.json" ), "w")
json.dump( scr, f)
f.flush()
f.close()





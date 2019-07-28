
import os
import sys

# Accumulate a list of fake and true speech clips
fake_forms = []
true_forms = []

# The train file
FILE = "../../DS_10283_3336/LA/ASVspoof2019_LA_cm_protocols/ASVspoof2019.LA.cm.train.trn.txt"
USE_GEN= [ "A03" ] # , "A04" ]
PREFIX = "ASVspoof2019_LA_train/flac"

# Open it and load some wave forms 
f = open(FILE)
lines = f.readlines()
f.close()

for line in lines:

	parts = line.strip().split()

	if parts[4] == "spoof":

		if parts[3] in USE_GEN:

			#print(parts)
			path = os.path.join( PREFIX, parts[1] + ".flac")
			fake_forms.append( [ "f", path, parts[0], parts[3] ] )

	elif parts[4] == "bonafide":

			
		path = os.path.join( PREFIX, parts[1] + ".flac")
		true_forms.append( [ "r", path, parts[0], parts[3] ] )


# eval file
FILE = "../../DS_10283_3336/LA/ASVspoof2019_LA_cm_protocols/ASVspoof2019.LA.cm.eval.trl.txt"
USE_GEN= [] # "A07" ]
PREFIX = "ASVspoof2019_LA_eval/flac"

# Open it and load some wave forms
f = open(FILE)
lines = f.readlines()
f.close()

for line in lines:

	parts = line.strip().split()

	if parts[4] == "spoof":

		if parts[3] in USE_GEN:

			#print(parts)
			path = os.path.join( PREFIX, parts[1] + ".flac")
			fake_forms.append( [ "f", path, parts[0], parts[3] ] )

	elif parts[4] == "bonafide":

		path = os.path.join( PREFIX, parts[1] + ".flac")
		true_forms.append( [ "r", path, parts[0], parts[3] ] )


print("fake_forms=",len(fake_forms))
print("true_forms=",len(true_forms))

# create lookups...
dct={}
for form in fake_forms:
	path = form[1]
	base = os.path.basename(path)
	dct[base] = False

for form in true_forms:
	path = form[1]
	base = os.path.basename(path)
	dct[base] = True

experiment = "exp_Thu_Jul_18_18_21_50_2019"

# load the experiment answers
exp_answers = os.path.join( "public", experiment, "TEST.txt" )
f = open( exp_answers )
ans_lines = f.readlines()
f.close()

# load the experiment script
import json
exp_script = os.path.join( "public", experiment, "exp", "SCRIPT.json" )
f = open( exp_script )
script = json.load(f)
print("script",script)
print("SCRIPT2=", script["2"])
f.close()

# Grade each entry...
grade_dir = "remote_data"
tests = os.listdir( grade_dir )

grades = []

for test in tests:
	f = open( os.path.join( grade_dir, test ) )
	obj = json.load(f)
	f.close()
	print("GUESS",obj)	

	score = 0
	for idx, ans_line in enumerate(ans_lines[0:10]):
		answer = ans_line.split(",")[0]
		guess = obj["one_results"][idx]	
		correct = ( answer=="f" and guess=="1" ) or ( answer=="r" and guess=="2" )
		if correct: score = score + 1
		print("GRADING", answer,guess, correct, score )
		
	one_score = score
	score = 0

	print("ANS LINES LEFT=", len(ans_lines[10:] ) )	
	for idx, ans_line in enumerate(ans_lines[10:]):
		fake_path = os.path.basename( ans_line.split(",")[1].split("-")[0].strip() )
		scr = script["2"][idx]
		scr1 = os.path.basename( scr[0] )
		scr2 = os.path.basename( scr[1] )
		#print("DBG", fake_path, scr1, scr2 )
		if scr1 == fake_path:
			fake_idx = "1"
		elif scr2 == fake_path:
			fake_idx = "2"
		else:
			print("THIS IS BADDD!!!")
			sys.exit(1)
		guess = obj["results"][idx]

		correct = ( guess == fake_idx )
		if correct: score = score + 1
		#print( ans_line.split(",") )
		print("GRADING", "first=",scr1, "second=",scr2, "fake=", fake_path, "fake_idx=", fake_idx, "guess=", guess, score )

	two_score = score
	
	grades.append( [ obj["name"], ( one_score, two_score, one_score+two_score ) ] )

print("ALL GRADES=", grades)

score = [ g[1][2]/20.0 for g in grades ]
print("SCORES=", score)
import statistics
print("STATS", min(score),max(score),statistics.median(score))


f = open("grades.txt","w")
for g in grades:
	f.write( "%s,%d,%d,%d\n" % ( g[0],g[1][0],g[1][1],g[1][2] ) )
	f.flush()
f.close()





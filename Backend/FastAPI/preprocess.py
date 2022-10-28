def preprocess(script):
    tmp = ""
    preprocessed_script=[]
    for line in script:
        if not tmp:
            start = line['start']
            duration = line['duration']
        no_whitespace_line = line['text'].replace("\n", " ")
        tmp += no_whitespace_line
        duration += line['duration']
        if "." in no_whitespace_line or "?" in no_whitespace_line or "!" in no_whitespace_line:
            preprocessed_script.append({'text':tmp, "start":start, "duration":duration})
            tmp = ""
            
    return preprocessed_script
        

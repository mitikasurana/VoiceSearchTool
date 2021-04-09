import sys
import nltk
from nltk.tag import pos_tag

nltk.download('stopwords')
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')


def get_tokens(cmd_string):
    
    stopwords = nltk.corpus.stopwords.words("english")
    additional_sw = ['wear', 'wearing', 'fashion', 'clothes', 'outfit'] #add more relevant terms
    stopwords.extend(additional_sw)

    cmd_tokens = pos_tag(nltk.word_tokenize(cmd_string))
    noun_tokens = [word for word,pos in cmd_tokens if pos == 'NN']

    result = []

    for token in noun_tokens:
        token = token+" "
        result.append(token)
        
    print("".join(result))

get_tokens(str(sys.argv[1]))
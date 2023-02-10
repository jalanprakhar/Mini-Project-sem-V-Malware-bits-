#!/usr/bin/env python
# coding: utf-8

# The NSL-KDD dataset comprises of 4 sub datasets-KDDTest+, KDDTest-21, KDDTrain+, KDDTrain+_20Percent, although KDDTest-21 and KDDTrain+_20Percent are subsets of the KDDTrain+ and KDDTest+

# In[314]:

print("Dataset being used: NSL-KDD Dataset")
print("----------Data Preprocessing phase---------")
print('\n')
import pandas as pd
import numpy as np


# In[315]:


col_names = ["duration","protocol_type","service","flag","src_bytes",
    "dst_bytes","land","wrong_fragment","urgent","hot","num_failed_logins",
    "logged_in","num_compromised","root_shell","su_attempted","num_root",
    "num_file_creations","num_shells","num_access_files","num_outbound_cmds",
    "is_host_login","is_guest_login","count","srv_count","serror_rate",
    "srv_serror_rate","rerror_rate","srv_rerror_rate","same_srv_rate",
    "diff_srv_rate","srv_diff_host_rate","dst_host_count","dst_host_srv_count",
    "dst_host_same_srv_rate","dst_host_diff_srv_rate","dst_host_same_src_port_rate",
    "dst_host_srv_diff_host_rate","dst_host_serror_rate","dst_host_srv_serror_rate",
    "dst_host_rerror_rate","dst_host_srv_rerror_rate","label","difficulty_level"]


# In[316]:


data=pd.read_csv("NSL-KDD\KDDTrain+.txt", header=None, names=col_names)


# In[317]:


#data


# In[318]:


data=data.drop(['difficulty_level'], axis=1)


# In[319]:


print("Initial shape of the dataset: ", data.shape[0], data.shape[1])


# In[320]:


#data


# In[321]:


datatypes=data.dtypes


# In[322]:

cat=0
num=0

for itr in datatypes:
    if itr=='int64' or itr=='float64':
        num=num+1
    else:
        cat=cat+1

print("Number of numerical features are: ", num)
print("Number of categorical features are: ", cat)


# In[323]:


#data.label.unique()


# Mapping of labels:
# 1. ipsweep, satan, nmap, portsweep, saint, mscan->Probe
# 2. teardrop, pod, land, back, neptune, smurf, mailbomb, udpstorm, apache2, processtable->DoS
# 3. perl, loadmodule, rootkit, buffer_overflow, xterm, ps, sqlattack, httptunnel->U2R
# 4. ftp_write, phf, guess_passwd, warezmaster, warezclient, imap, spy, multihop, named, snmpguess, worm, snmpgetattack, xsnoop, xlock, sendmail->R2L
# 5. normal->Normal

# In[324]:


mapping = {'ipsweep': 'Probe','satan': 'Probe','nmap': 'Probe','portsweep': 'Probe','saint': 'Probe','mscan': 'Probe',
        'teardrop': 'DoS','pod': 'DoS','land': 'DoS','back': 'DoS','neptune': 'DoS','smurf': 'DoS','mailbomb': 'DoS',
        'udpstorm': 'DoS','apache2': 'DoS','processtable': 'DoS',
        'perl': 'U2R','loadmodule': 'U2R','rootkit': 'U2R','buffer_overflow': 'U2R','xterm': 'U2R','ps': 'U2R',
        'sqlattack': 'U2R','httptunnel': 'U2R',
        'ftp_write': 'R2L','phf': 'R2L','guess_passwd': 'R2L','warezmaster': 'R2L','warezclient': 'R2L','imap': 'R2L',
        'spy': 'R2L','multihop': 'R2L','named': 'R2L','snmpguess': 'R2L','worm': 'R2L','snmpgetattack': 'R2L',
        'xsnoop': 'R2L','xlock': 'R2L','sendmail': 'R2L',
        'normal': 'Normal'
        }


# In[325]:


train_data=pd.read_csv("NSL-KDD\KDDTrain+.txt", header=None, names=col_names)
test_data=pd.read_csv("NSL-KDD\KDDTest+.txt", header=None, names=col_names)


# In[326]:


train_data['attack_class']=train_data['label'].apply(lambda v: mapping[v])
test_data['attack_class'] = test_data['label'].apply(lambda v: mapping[v])


# In[327]:


#train_data.shape


# In[328]:


train_data=train_data.drop(['difficulty_level', 'label'], axis=1)
test_data=test_data.drop(['difficulty_level', 'label'], axis=1)


# In[329]:


#train_data.shape


# In[330]:


#test_data.shape


# In[331]:


attack_class_freq_train=train_data[['attack_class']].apply(lambda x: x.value_counts())
attack_class_freq_test=test_data[['attack_class']].apply(lambda x: x.value_counts())
attack_class_freq_train['frequency_percent_train'] = round((100 * attack_class_freq_train / attack_class_freq_train.sum()),2)
attack_class_freq_test['frequency_percent_test'] = round((100 * attack_class_freq_test / attack_class_freq_test.sum()),2)

attack_class_dist = pd.concat([attack_class_freq_train,attack_class_freq_test], axis=1) 
print('\n')
print("Distribution of attack class")
print(attack_class_dist.to_markdown()) 
print('\n')


# In[332]:

print("Label encoding the categorical features and scaling the numerical features")
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()

# extract numerical attributes and scale it to have zero mean and unit variance  
cols = train_data.select_dtypes(include=['float64','int64']).columns
sc_train = scaler.fit_transform(train_data.select_dtypes(include=['float64','int64']))
sc_test = scaler.fit_transform(test_data.select_dtypes(include=['float64','int64']))

# turn the result back to a dataframe
sc_traindf = pd.DataFrame(sc_train, columns = cols)
sc_testdf = pd.DataFrame(sc_test, columns = cols)


# In[333]:


from sklearn.preprocessing import LabelEncoder
encoder = LabelEncoder()

# extract categorical attributes from both training and test sets 
cattrain=train_data.select_dtypes(include=['object']).copy()
cattest=test_data.select_dtypes(include=['object']).copy()

# encode the categorical attributes
traincat = cattrain.apply(encoder.fit_transform)
testcat = cattest.apply(encoder.fit_transform)

# separate target column from encoded data 
enctrain = traincat.drop(['attack_class'], axis=1)
enctest = testcat.drop(['attack_class'], axis=1)

cat_Ytrain = traincat[['attack_class']].copy()
cat_Ytest = testcat[['attack_class']].copy()


# In[334]:

print("Resampling the dataset as distribution of labels is non-uniform")
from imblearn.over_sampling import RandomOverSampler 
from collections import Counter

# define columns and extract encoded train set for sampling 
sc_traindf = train_data.select_dtypes(include=['float64','int64'])
column_names = pd.concat([sc_traindf, enctrain], axis=1).columns
refclass = np.concatenate((sc_train, enctrain.values), axis=1)
X = refclass


# reshape target column to 1D array shape  
c, r = cat_Ytest.values.shape
y_test = cat_Ytest.values.reshape(c,)

c, r = cat_Ytrain.values.shape
y = cat_Ytrain.values.reshape(c,)

# apply the random over-sampling
ros = RandomOverSampler(random_state=42)
X_res, y_res = ros.fit_resample(X, y)
print('Original dataset shape {}'.format(Counter(y)))
print('Resampled dataset shape {}'.format(Counter(y_res)))
print('\n')


# # Using gini index as the criteria for feature selection

# In[335]:

print("---------Feature Selection--------")
from sklearn.ensemble import ExtraTreesClassifier
import sklearn.ensemble as ek
from sklearn.feature_selection import SelectFromModel


# In[336]:

print("Feature selection criteria: gini_index")
extra_tree_forest = ExtraTreesClassifier(n_estimators = 5,
                                        criterion ='gini', max_features = 2)
# Training the model
extra_tree_forest.fit(X_res, y_res)
  
# Computing the importance of each feature
feature_importance_gini = extra_tree_forest.feature_importances_
  
# Normalizing the individual importances
feature_importance_normalized = np.std([tree.feature_importances_ for tree in 
                                        extra_tree_forest.estimators_],
                                        axis = 0)


# In[337]:


#feature_importance_gini


# In[ ]:





# In[338]:


score_gini = np.round(feature_importance_gini,3)
#importances = importances.sort_values('importance',ascending=False).set_index('feature')


# In[339]:


#print(len(score_gini))


# In[340]:


importance_gini_dict={}
for i in range(41):
    importance_gini_dict[column_names[i]]=score_gini[i]


# In[341]:


#print(importance_gini_dict)


# In[342]:


rev_importance_gini_dict={k: v for k, v in sorted(importance_gini_dict.items(), key=lambda item: item[1], reverse=True)}


# In[343]:

print("Important features based on gini_index(in descending order):")
for key in rev_importance_gini_dict:
    print(key)
print('\n')


# # Using entropy(Information Gain) as criteria for feature selection

# In[344]:

print("Feature selection criteria: entropy")
extra_tree_forest_ent = ExtraTreesClassifier(n_estimators = 5,
                                        criterion ='entropy', max_features = 2)
# Training the model
extra_tree_forest_ent.fit(X_res, y_res)
  
# Computing the importance of each feature
feature_importance_ent = extra_tree_forest_ent.feature_importances_
  
# Normalizing the individual importances
feature_importance_normalized_ent = np.std([tree.feature_importances_ for tree in 
                                        extra_tree_forest_ent.estimators_],
                                        axis = 0)


# In[345]:


#feature_importance_ent


# In[346]:


score_ent= np.round(feature_importance_ent,3)
importance_ent_dict={}
for i in range(41):
    importance_ent_dict[column_names[i]]=score_ent[i]


# In[347]:


#print(importance_ent_dict)


# In[348]:


rev_importance_ent_dict={k: v for k, v in sorted(importance_ent_dict.items(), key=lambda item: item[1], reverse=True)}


# In[349]:
print("Important features based on entropy(in descending order):")
for key in rev_importance_ent_dict:
    print(key)
print('\n')
    
print('\n')


# # Using the important features

# In[350]:


feat1=[]
cnt1=0
for k in rev_importance_gini_dict:
    if cnt1<20:
        feat1.append(k)
    cnt1=cnt1+1


# In[351]:


feat2=[]
cnt2=0
for k in rev_importance_ent_dict:
    if cnt2<20:
        feat2.append(k)
    cnt2=cnt2+1


# In[352]:


total_feat=[]


# In[353]:


def Union(lst1, lst2):
    final_list = list(set(lst1) | set(lst2))
    return final_list


# In[354]:


total_feat=Union(feat1, feat2)


# In[355]:


#print(total_feat)


# In[356]:


print("number of selected features: ", format(len(total_feat)))
print('\n')
print("Selected features are")

for i in range(0, len(total_feat)):
    print(total_feat[i])

# In[357]:


#print(X_res.shape)


# In[358]:


df_train=pd.read_csv("NSL-KDD\KDDTrain+.txt", header=None, names=col_names)
df_test=pd.read_csv("NSL-KDD\KDDTest+.txt", header=None, names=col_names)


# In[359]:


df_train['attack_class']=df_train['label'].apply(lambda v: mapping[v])
df_test['attack_class'] =df_test['label'].apply(lambda v: mapping[v])


# In[360]:


df_train=df_train.drop(['difficulty_level', 'label'], axis=1)
df_test=df_test.drop(['difficulty_level', 'label'], axis=1)


# In[361]:


total_feat_set=set(total_feat)


# In[362]:


for col in df_train:
    if col in total_feat_set or col=='attack_class':
        continue
    else:
        df_train=df_train.drop(col, axis=1)


# In[363]:


#df_train


# In[364]:


for col in df_test:
    if col in total_feat_set or col=='attack_class':
        continue
    else:
        df_test=df_test.drop(col, axis=1)


# In[365]:


#df_test


# In[366]:


# extract numerical attributes and scale it to have zero mean and unit variance  
cols = df_train.select_dtypes(include=['float64','int64']).columns
sc_df_train = scaler.fit_transform(df_train.select_dtypes(include=['float64','int64']))
sc_df_test = scaler.fit_transform(df_test.select_dtypes(include=['float64','int64']))

# turn the result back to a dataframe
train_dataframe = pd.DataFrame(sc_df_train, columns = cols)
test_dataframe = pd.DataFrame(sc_df_test, columns = cols)


# In[367]:


# extract categorical attributes from both training and test sets 
cattrain_df=df_train.select_dtypes(include=['object']).copy()
cattest_df=df_test.select_dtypes(include=['object']).copy()

# encode the categorical attributes
traincat_df = cattrain_df.apply(encoder.fit_transform)
testcat_df = cattest_df.apply(encoder.fit_transform)

# separate target column from encoded data 
enctrain_df = traincat_df.drop(['attack_class'], axis=1)
enctest_df = testcat_df.drop(['attack_class'], axis=1)

cat_Ytrain_df = traincat_df[['attack_class']].copy()
cat_Ytest_df = testcat_df[['attack_class']].copy()


# In[368]:


#train_dataframe


# In[369]:


#enctrain_df


# In[370]:


X_df_final_train=pd.concat([train_dataframe, enctrain_df], axis=1)


# In[371]:


#X_df_final_train


# In[372]:


y_df_final_train=cat_Ytrain_df


# In[373]:


X_df_final_test=pd.concat([test_dataframe, enctest_df], axis=1)


# In[374]:


y_df_final_test=cat_Ytest_df


# In[375]:


dataset_non_res_train=pd.concat([X_df_final_train, y_df_final_train], axis=1)
dataset_non_res_test=pd.concat([X_df_final_test, y_df_final_test], axis=1)
#dataset_res_train=pd.concat([X_final_train_resampled, y_final_train_resampled])
#dataset_res_test=pd.concat([X_final_test_resampled, y_final_test_resampled])


# In[376]:


dataset_non_res_train.to_csv("processed_train.csv")
dataset_non_res_test.to_csv("processed_test.csv")
print('\n')
print("Final training and testing datasets are ready")

# In[377]:


dataset_non_res_train


# In[378]:


dataset_non_res_test


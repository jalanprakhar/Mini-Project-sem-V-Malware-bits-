

import numpy as np
import pandas as pd
from sklearn.svm import SVC 
from sklearn.naive_bayes import BernoulliNB 
from sklearn.naive_bayes import MultinomialNB
from sklearn.naive_bayes import GaussianNB
from sklearn import tree
from sklearn.linear_model import LogisticRegression
from sklearn import metrics
from sklearn.ensemble import RandomForestClassifier
from sklearn import svm
from sklearn.ensemble import AdaBoostClassifier
from sklearn.neural_network import MLPClassifier

def multiclass():
    print("====================Model training=================")
    train_data=pd.read_csv("processed_train.csv")
    test_data=pd.read_csv("processed_test.csv")

    X_train=train_data.iloc[:, 1:-1]
    X_test=test_data.iloc[:, 1:-1]
    y_train=train_data.iloc[:, -1]
    y_test=test_data.iloc[:, -1]

    print("Select supervised-learning model:")
    models=[]
    models.append("Logistic Regression Classifier")
    models.append("Random Forest Classifier")
    models.append("Decision Tree Classifier")
    models.append("Naive Bayes Classifier")
    models.append("AdaBoost Classifier")
    models.append("ANN Classifier")

    cnt=1
    for i in models:
        print(cnt, i)
        cnt=cnt+1

    model_num = input()
    model_num=int(model_num)

    print("Training ", models[model_num-1])
    print("Hyperparameter Selection: ")

    y_pred_train=None
    y_pred_test=None
    clf=None

    if model_num==1:
        print("Select Solver: ")
        solver_list=["newton-cg", "lbfgs", "liblinear", "sag", "saga"]
        for i in range(len(solver_list)):
            print(i+1, solver_list[i])
        solver_num=input()
        solver_num=int(solver_num)
        print()
        print("Select penalty type: ")
        penalty_list=["l1", "l2", "elasticnet", "none"]
        for i in range(len(penalty_list)):
            print(i+1, penalty_list[i])
        penalty_num=input()
        penalty_num=int(penalty_num)
        print()
        print("Enter maximum number of iterations: ")
        mx_iter=input()
        mx_iter=int(mx_iter)
        clf= LogisticRegression(solver=solver_list[solver_num-1], penalty=penalty_list[penalty_num-1], max_iter=mx_iter)


    if model_num==2:
        print("Enter number of estimators: ")
        n_est=input()
        n_est=int(n_est)
        print("Enter maximum depth: ")
        mx_dpth=input()
        mx_dpth=int(mx_dpth)
        print("Enter minimum samples split: ")
        mn_sp=input()
        mn_sp=int(mn_sp)
        print("Enter maximum number of features for splitting: ")
        mx_ft_list=["auto", "sqrt", "log2", "None"]
        for i in range(len(mx_ft_list)):
            print(i+1, mx_ft_list[i])
        mx_ft=input()
        mx_ft=int(mx_ft)
        clf=RandomForestClassifier(n_estimators=n_est, max_depth=mx_dpth, min_samples_split=mn_sp, max_features=mx_ft_list[mx_ft-1])


    if model_num==3:
        print("Select splitting criterion: ")
        crit_list=["gini", "entropy"]
        for i in range(len(crit_list)):
            print(i+1, crit_list[i])
        crit=input()
        crit=int(crit)
        print("Enter maximum depth: ")
        mx_dpth=input()
        mx_dpth=int(mx_dpth)
        print("Enter minimum samples split: ")
        mn_sp=input()
        mn_sp=int(mn_sp)
        print("Enter maximum number of features for splitting: ")
        mx_ft_list=["auto", "sqrt", "log2", "None"]
        for i in range(len(mx_ft_list)):
            print(i+1, mx_ft_list[i])
        mx_ft=input()
        mx_ft=int(mx_ft)
        clf=tree.DecisionTreeClassifier(criterion=crit_list[crit-1], max_depth=mx_dpth, min_samples_split=mn_sp, max_features=mx_ft_list[mx_ft-1])


    if model_num==4:
        print("Select sub-classifier: ")
        cl_list=["BernoulliNB", "MultinomialNB", "GaussianNB"]
        for i in range(len(cl_list)):
            print(i+1, cl_list[i])
        cl=input()
        cl=int(cl)
        if cl==1:
            clf=BernoulliNB()
        elif cl==2:
            clf=MultinomialNB()
        else:
            clf=GaussianNB()



    if model_num==5:
        print("Enter number of estimators: ")
        n_est=input()
        n_est=int(n_est)
        print("Enter value of learning rate: ")
        alpha=input()
        alpha=float(alpha)
        clf=AdaBoostClassifier(n_estimators=n_est, learning_rate=alpha)

    if model_num==6:
        print("Select activation type: ")
        acti_list=["identity", "logistic", "tanh", "relu"]
        for i in range(len(acti_list)):
            print(i+1, acti_list[i])
        acti=int(input())
        print("Select solver type: ")
        solver_list=["lbfgs", "sgd", "adam"]
        for i in range(len(solver_list)):
            print(i+1, solver_list[i])
        sol=int(input())
        print("Enter batch size: ")
        bs=int(input())
        print("Enter maximum number of iterations: ")
        max_iter=int(input())
        alpha=0.0
        if solver_list[sol-1]=='sgd' or solver_list[sol-1]=='adam':
            print("Enter value of initial learning rate(alpha): ")
            alpha=float(input())
        if alpha==0.0:
            clf=MLPClassifier(activation=acti_list[acti-1], solver=solver_list[sol-1], batch_size=bs, max_iter=max_iter)
        else:
            clf=MLPClassifier(activation=acti_list[acti-1], solver=solver_list[sol-1], batch_size=bs, max_iter=max_iter, learning_rate_init=alpha)

    clf.fit(X_train, y_train)
    #accuracy = clf.score(X_train, y_train)
    y_train_pred=clf.predict(X_train)
    accuracy=metrics.accuracy_score(y_train, y_train_pred)
    confusion_matrix = metrics.confusion_matrix(y_train, y_train_pred)
    classification = metrics.classification_report(y_train, y_train_pred)
    print()
    print('==============================  Model performance on training data ==============================')
    print()
    print ("Training Accuracy:" "\n", accuracy)
    print()
    print("Confusion matrix for training data:" "\n", confusion_matrix)
    print()
    print("Classification report for training data:" "\n", classification) 
    print()

    y_pred_test=clf.predict(X_test)
    #test_acc=clf.score(X_test, y_pred_test)
    test_acc=metrics.accuracy_score(y_test, y_pred_test)
    cnf_mat_test=metrics.confusion_matrix(y_test, y_pred_test)
    clf_report=metrics.classification_report(y_test, y_pred_test)
    print('==============================  Model performance on testing data ==============================')

    print()
    print ("Testing Accuracy:" "\n", test_acc)
    print()
    print("Confusion matrix for testing data:" "\n", cnf_mat_test)
    print()
    print("Classification report for testing data:" "\n", clf_report)
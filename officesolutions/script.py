#!/usr/local/bin/python3
print("Content-type: text/html\n\n")
import sqlite3
import re
import cgi
from collections import OrderedDict
def exec(conn,str):
    with conn:
        cur = conn.cursor()
    try:
        cur.execute(str)

        results = cur.fetchall()
        return(results)
    except:
        return None

def getData():
    EmpID = input('Please enter your employee ID: ')
    EmpID = EmpID.strip()

    while (EmpID == '' or (EmpID.isdigit() != True)):
        EmpID = input('This is a required field, and it should only contain digits: ')
        EmpID = EmpID.strip()


    firstName = input('Please enter your first name: ')
    firstName = firstName.strip().title()


    while (firstName == '' or (firstName.isalpha() != True)):
        firstName = input('This is a required field, and it cannot contain any digits: ')
        firstName = firstName.strip().title()


    lastName = input('Please enter your last name: ')
    lastName = lastName.strip().title()

    while (lastName == '' or (lastName.isalpha() != True)):
        lastName = input('This is a required field, and it cannot contain any digits: ')
        lastName = lastName.strip().title()

    empEmail = input('Please enter your employee email: ')
    empEmail = empEmail.strip().lower()

    while (empEmail == '' or (empEmail.isdigit())):
        empEmail = input('This is a required field, and it cannot contain only digits: ')
        empEmail = empEmail.strip().lower()

    empPassword = input('Please enter your password: ')
    empPassword.lower()

    while (empPassword == '' ):
        empPassword = input('This is a required field, please enter an employee password: ')
        empPassword.lower()
    data=[]
    data.append(EmpID)
    data.append(firstName)
    data.append(lastName)
    data.append(empEmail)
    data.append(empPassword)
    return data

def checkLogin(email,passw):
    query="SELECT COUNT (*) FROM Employee WHERE Email = '{0}' AND Password = '{1}'".format(email,passw)
    conn = sqlite3.connect('OS_Employee.db')
    count=exec(conn,query)
    # print(count)
    if count[0][0] != 0:
        return 1
    else:
        return 0
def registerUser(empid,empemail,emplname,empfname,emppassword):
    conn = sqlite3.connect('OS_Employee.db')
    count=exec(conn,"SELECT COUNT (EmployeeID) FROM Employee WHERE EmployeeID = '{0}'".format(empid))

    if count[0][0] != 0:
        print("exists")
        # data=getData()
        # count=exec(conn,"SELECT COUNT (EmployeeID) FROM Employee WHERE EmployeeID = '{0}'".format(empid))
    else:
        
        exec(conn,"INSERT INTO Employee VALUES ('{0}', '{1}', '{2}', '{3}', '{4}')".format(empid,empfname,emplname,empemail,emppassword))
        conn.commit()
        d= exec(conn,"SELECT * FROM Employee WHERE EmployeeID = '{0}'".format(empid))
        print("success")

if __name__ == "__main__":
    form=cgi.FieldStorage()
    type=str(form.getvalue('type'))

    if(type=="login"):
        email=str(form.getvalue('email'))
        password=str(form.getvalue('password'))
        if(checkLogin(email,password)==1):
            print('logged-in')
        else:
            print('not-found')
    elif(type=="register"):

        empid=str(form.getvalue('emp-id'))
        empemail=str(form.getvalue('emp-email'))
        emplname=str(form.getvalue('emp-lname'))
        empfname=str(form.getvalue('emp-fname'))
        emppassword=str(form.getvalue('password'))
        registerUser(empid,empemail,emplname,empfname,emppassword)
    else:
        print("error")



    # conn = sqlite3.connect('OS_Employee.db')
    # data=getData()
    # count=exec(conn,"SELECT COUNT (EmployeeID) FROM Employee WHERE EmployeeID = '{0}'".format(data[0]))
    #
    # while count[0][0] != 0:
    #     print("empID exists try new one")
    #     data=getData()
    #     count=exec(conn,"SELECT COUNT (EmployeeID) FROM Employee WHERE EmployeeID = '{0}'".format(data[0]))
    #
    #
    # exec(conn,"INSERT INTO Employee VALUES ('{0}', '{1}', '{2}', '{3}', '{4}')".format(data[0],data[1],data[2],data[3],data[4]))
    # d= exec(conn,"SELECT * FROM Employee WHERE EmployeeID = '{0}'".format(data[0]))
    # print()
    # print("new data" + str(d))

from __future__ import print_function
from googleapiclient.discovery import build
from apiclient import errors
from apiclient import http
from httplib2 import Http
from oauth2client import file, client, tools
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import argparse
import time, csv

import pymysql
connection = pymysql.connect(host='104.196.121.215',
                             user='<USER>',
                             password='<PASSWORD>',
                             db='<DATABASE>')

# Connect to online spreadsheet using Google sheets API 
# (not curently functional due to authorization issues)
def get_google_sheet_data():
    # ID for application responses sheet
    file_id = '1ePSxNAAg2Cfq4sBKhEmzf22Z58edSCLKIpxKCBATDoc'
    SAMPLE_RANGE_NAME = 'Class Data!A2:E'
    SCOPES = 'https://www.googleapis.com/auth/spreadsheets'
    SCOPES = 'https://www.googleapis.com/feeds'

    store = file.Storage('token.json')
    creds = store.get()
    if not creds or creds.invalid:
        flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
        flow = client.flow_from_clientsecrets('client_id.json', SCOPES)
        creds = tools.run_flow(flow, store, flags)

    SHEETS = build('sheets', 'v4', http=creds.authorize(Http()))
    sheet = SHEETS.spreadsheets().values().get(spreadsheetId=file_id,
                                            range=SAMPLE_RANGE_NAME).execute()
    values = sheet.get('values', [])

    # # use creds to create a client to interact with the Google Drive API
    # scope = ['https://spreadsheets.google.com/feeds']
    # creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
    # client = gspread.authorize(creds)

    # # Find a workbook by name and open the sheet
    # sheet = client.open("VCU Computer Science Undergraduate Teaching Assistant Application (Responses)").sheet1

    # # Extract and print all of the values
    # list_of_hashes = sheet.get_all_records()
    # print(list_of_hashes)

    if not values:
            print('No data found.')
    else:
        print('Data is...')
        for row in values:
            # Print columns A and E, which correspond to indices 0 and 4.
            print('%s, %s' % (row[0], row[4]))

    return values


# Open csv and load data into list of dicts
def load_sheet_data():
    with open('Applications.tsv', newline='\n') as csvfile:
        data = [{k: v for k, v in row.items()} 
        for row in csv.DictReader(csvfile, skipinitialspace=True, delimiter='\t')]
    return data


def in_db(applicant_email):
    # Connect to database and check for entry that has matching email
    return False


# TODO
def remove_from_sheet(entry):
    print("TODO removing from sheet...")


# TODO
def send_reference(entry):
    print('TODO sending email to reference...')

    # Validate reference email

    # Connect to reference form and send it to given email


# TODO - find correct values
def transform_data(entry):
    print("TODO transforming data...")
    db_entry = []
    return db_entry


# TODO - create db connection
def add_to_applicant_table(entry):
    entry = transform_data(entry)

    # Create connection to database
    
    # Add value to applicant table
    if in_db(entry):
        print('update')
    else:
        print('add')


def handle_applications(google_connect=False):
    if google_connect:
        # Working with Google sheet
        sheet = get_google_sheet_data()
    else:
        # Working with local spreadsheet
        sheet = load_sheet_data()

    for entry in sheet:
        print(entry)
        add_to_applicant_table(entry)
        send_reference(entry)
        if google_connect:
            remove_from_sheet(entry)


handle_applications()
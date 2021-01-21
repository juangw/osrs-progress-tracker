from osrs.enums import AccountType

import requests


class Osrs(object):
    def __init__(self, username: str, account_type: AccountType):
        self.username = username
        self.account_type = account_type

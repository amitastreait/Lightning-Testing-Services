public with sharing class AccountController {
    public AccountController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
        List<Account> accountList = [Select Id, Name From Account Limit 10];
        return accountList;
    }
    @AuraEnabled(cacheable=true)
    public static Account[] getAccounts() {
        List<Account> accounts = new List<Account>();
        accounts.add(new Account(Name = 'Account 1'));
        accounts.add(new Account(Name = 'Account 2'));
        accounts.add(new Account(Name = 'Account 3'));
        return accounts;
    }
}

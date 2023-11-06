import PropTypes from "prop-types"
SortData.PropTypes={
  ColumTitle:PropTypes.string.isRequired, 
  sortDirection:PropTypes.oneOf["asc","desc"],
  setSortDirection:PropTypes.func.isRequired,
  Data:PropTypes.array.isRequired,
  SetData:PropTypes.func.isRequired,
  /*ADD HERE IF YOU ADD ANY NEW TABLES AND UPDATE THE LOGIC BELOW SO IT KNOWS HOW TO SORT IT FOR YOUR NEW TABLE
   */
  Table:PropTypes.oneOf(
["MyOrders",
"Order",
"Orders",
"Products",
"Accounts",
"Inbox_Order",
"Inbox_Contact"
]).isRequired,
}
export default function SortData(
  ColumTitle,
  sortDirection,
  setSortDirection,
  Data,
  SetData,
  Table,
)
{
  let CollumnName = '';

  if (Table == 'MyOrders') {
    switch (ColumTitle) {
      case 'Order':
        CollumnName = 'OrderID';
        break;
      case 'Employee':
        CollumnName = 'name';
        break;
      case 'Status':
        CollumnName = 'status';
        break;
      case 'Date':
        CollumnName = 'date';
        break;
      case 'Total':
        CollumnName = 'Total';
        break;
    }
  }
  if (Table == 'Order') {
    switch (ColumTitle) {
      case 'Product Code':
        CollumnName = 'P_Code';
        break;
      case 'Product':
        CollumnName = 'name';
        break;
      case 'Quantity':
        CollumnName = 'Quantity';
        break;
      case 'Status':
        CollumnName = 'status';
        break;
      case 'Unit Price':
        CollumnName = 'Unit';
        break;
      case 'Total':
        CollumnName = 'Total';
        break;
    }
  }

  if (Table == 'Orders') {
    switch (ColumTitle) {
      case 'Order ID':
        CollumnName = 'OrderID';
        break;
      case 'Client':
        CollumnName = 'name';
        break;
      case 'Number':
        CollumnName = 'number';
        break;
      case 'Status':
        CollumnName = 'status';
        break;
      case 'Date':
        CollumnName = 'date';
        break;
      case 'Total':
        CollumnName = 'Total';
        break;
    }
  }

  if (Table == 'Products') {
    switch (ColumTitle) {
      case 'Product Code':
        CollumnName = 'ProductCode';
        break;
      case 'Product':
        CollumnName = 'Model';
        break;
      case 'Price':
        CollumnName = 'Price';
        break;
      case 'Status':
        CollumnName = 'Status';
        break;
      case 'Category':
        CollumnName = 'Category';
        break;
      case 'Shop Quantity':
        CollumnName = 'Shop_Quantity';
        break;
      case 'Stock Quantity':
        CollumnName = 'StockRoom_Quantity';
        break;
      case 'Short Description':
        CollumnName = 'SDescription';
        break;
      case 'Long Description':
        CollumnName = 'LDescription';
        break;
      case 'Information':
        CollumnName = 'Information';
        break;
      case 'Shipping':
        CollumnName = 'Shipping';
        break;
    }
  }

  if (Table == 'Accounts') {
    switch (ColumTitle) {
      case 'Account ID':
        CollumnName = 'AccountId';
        break;
      case 'Username':
        CollumnName = 'UserName';
        break;
      case 'Full Name':
        CollumnName = 'FirstName';
        break;
      case 'privilege':
        CollumnName = 'Privilege';
        break;
      case 'Total Spent':
        CollumnName = 'TotalSpent';
    }
  }

  if (Table == 'Inbox_Order') {
    switch (ColumTitle) {
      case 'Order':
        CollumnName = 'OrderID';
        break;
      case 'Message':
        CollumnName = 'Notification_Message';
        break;
    }
  }

  if (Table == 'Inbox_Contact') {
    switch (ColumTitle) {
      case 'Email':
        CollumnName = 'Email';
        break;
      case 'First Name':
        CollumnName = 'F_Name';
        break;
      case 'Last Name':
        CollumnName = 'L_Name';
        break;
      case 'Phone Number':
        CollumnName = 'PhoneNumber';
        break;
      case 'Message':
        CollumnName = 'Notification_Message';
        break;
    }
  }
  // Toggle sorting direction
  const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';

  // Sort the data based on the selected column and direction
  const sorted = [...Data].sort((a, b) => {
    if (newSortDirection === 'asc') {
      //Testing if the row is parsable
      const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
      if (datePattern.test(a[CollumnName])) {
        //testing if it's a date to compare it as a date
        return new Date(a[CollumnName]) > new Date(b[CollumnName]) ? 1 : -1;
      } else if (!isNaN(parseInt(a[CollumnName]))) {
        //Testing if it's an integer to compare it as a number
        return parseInt(a[CollumnName], 10) > parseInt(b[CollumnName], 10)
          ? 1
          : -1;
      } else {
        return a[CollumnName] > b[CollumnName] ? 1 : -1;
      }
    } else {
      //Testing if the row is parsable
      const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
      if (datePattern.test(a[CollumnName])) {
        //testing if it's a date to compare it as a date
        return new Date(a[CollumnName]) < new Date(b[CollumnName]) ? 1 : -1;
      } else if (!isNaN(parseInt(a[CollumnName]))) {
        //Testing if it's an integer to compare it as a number
        return parseInt(a[CollumnName], 10) < parseInt(b[CollumnName], 10)
          ? 1
          : -1;
      } else {
        return a[CollumnName] < b[CollumnName] ? 1 : -1;
      }
    }
  });

  setSortDirection(newSortDirection);
  SetData(sorted);
}

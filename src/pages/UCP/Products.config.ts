import { ColumnBuilder } from 'types/components/column';
import { WidgetBuilder } from '../../types/components/widget';
/********************************************************************************************************************
 * --------------------------------------------Products Grid Configuration------------------------------------------
 *********************************************************************************************************************/
export const productsGridColumns = [
  new ColumnBuilder()
    .setDataField('ProductCode')
    .setCaption('CODE')
    .setAllowGrouping(true)
    .setHidingPriority(11)
    .build(),
  new ColumnBuilder()
    .setDataField('img')
    .setCaption('')
    .setType('IMG')
    .setAllowGrouping(false)
    .setHidingPriority(10)
    .build(),
  new ColumnBuilder()
    .setDataField('Category')
    .setCaption('CATEGORY')
    .setAllowGrouping(true)
    .setHidingPriority(9)
    .build(),
  new ColumnBuilder().setDataField('Brand').setCaption('BRAND').setHidingPriority(8).build(),
  new ColumnBuilder().setDataField('Model').setCaption('MODEL').setAllowGrouping(true).setHidingPriority(7).build(),
  new ColumnBuilder().setDataField('Price').setCaption('PRICE').setAllowGrouping(true).setHidingPriority(6).build(),
  new ColumnBuilder()
    .setDataField('Shop_Quantity')
    .setCaption('SHOP STOCK')
    .setAllowGrouping(true)
    .setHidingPriority(4)
    .build(),
  new ColumnBuilder()
    .setDataField('StockRoom_Quantity')
    .setCaption('STOCK')
    .setAllowGrouping(true)
    .setHidingPriority(3)
    .build(),
  new ColumnBuilder()
    .setDataField('Status')
    .setTemplate('HIGHLIGHT')
    .setCaption('STATUS')
    .setAllowGrouping(true)
    .setHidingPriority(5)
    .build(),

  new ColumnBuilder()
    .setDataField('SDescription')
    .setCaption('DESCRIPTION')
    .setAllowGrouping(true)
    .setHidingPriority(2)
    .build(),
  new ColumnBuilder()
    .setDataField('LDescription')
    .setCaption('DESCRIPTION')
    .setAllowGrouping(true)
    .setHidingPriority(1)
    .build(),
  new ColumnBuilder()
    .setDataField('Information')
    .setCaption('INFORMATION')
    .setAllowGrouping(true)
    .setHidingPriority(0)
    .build(),
];

export const productsGridHeaderWidgets = [
  new WidgetBuilder().setId(0).setType('BUTTON').setIcon('fa-solid fa-plus').setCaption('Add').build(),
  new WidgetBuilder().setIcon('fa-solid fa-pen').setId(1).setType('BUTTON').setCaption('edit').build(),
  new WidgetBuilder()
    .setIcon('fa-solid fa-trash')
    .setId(2)
    .setConfirmationPopup(true)
    .setType('BUTTON')
    .setCaption('Delete')
    .setConfirmationPopup(true)
    .setConfirmationPopupColor('red')
    .setConfirmationPopupMessage('Are you sure you want to Delete?')
    .build(),
  new WidgetBuilder()
    .setIcon('fa-solid fa-table-list')
    .setId(3)
    .setType('BUTTON')
    .setCaption('Manage Category')
    .build(),
];

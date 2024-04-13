import { ColumnBuilder } from 'types/components/column';
import { WidgetBuilder } from 'types/components/widget';
/********************************************************************************************************************
 * --------------------------------------------Products Grid Configuration------------------------------------------
 *********************************************************************************************************************/
export const ordersGridColumns = [
  new ColumnBuilder()
    .setDataField('orderNum')
    .setCaption('N: Order')
    .setAllowGrouping(true)
    .setHidingPriority(11)
    .build(),
  new ColumnBuilder()
    .setDataField('ordererProfileImg')
    .setCaption('')
    .setType('IMG')
    .setAllowGrouping(false)
    .setHidingPriority(10)
    .build(),
  new ColumnBuilder()
    .setDataField('ordererName')
    .setCaption('Name')
    .setAllowGrouping(true)
    .setHidingPriority(6)
    .build(),
  new ColumnBuilder()
    .setDataField('orderStatus')
    .setCaption('STATUS')
    .setTemplate('HIGHLIGHT')
    .setAllowGrouping(true)
    .setHidingPriority(9)
    .build(),
  new ColumnBuilder()
    .setDataField('orderTotal')
    .setCaption('TOTAL')
    .setAllowGrouping(true)
    .setHidingPriority(7)
    .build(),
  new ColumnBuilder()
    .setDataField('orderCreationDate')
    .setCaption('DATE')
    .setDataType('datetime')
    .setHidingPriority(8)
    .build(),

  new ColumnBuilder()
    .setDataField('ordererPhoneNumber')
    .setCaption('TEL')
    .setAllowGrouping(true)
    .setHidingPriority(4)
    .build(),
];

export const ordersGridHeaderWidgets = [
  new WidgetBuilder().setId(0).setType('BUTTON').setIcon('fa-solid fa-eye').setCaption('Inspect Order').build(),
  new WidgetBuilder()
    .setIcon('fa-solid fa-money-bill-1-wave')
    .setId(1)
    .setType('BUTTON')
    .setCaption('Mark Paid')
    .setConfirmationPopup(true)
    .setConfirmationPopupColor('green')
    .setConfirmationPopupMessage('Are you sure you want to mark this order Paid?')
    .build(),
  new WidgetBuilder()
    .setIcon('fa-solid fa-square-check')
    .setId(2)
    .setConfirmationPopup(true)
    .setType('BUTTON')
    .setCaption('Mark Ready')
    .setConfirmationPopup(true)
    .setConfirmationPopupColor('green')
    .setConfirmationPopupMessage('Are you sure you want to mark this order Ready?')
    .build(),
  new WidgetBuilder()
    .setIcon('fa-solid fa-circle-play')
    .setId(3)
    .setType('BUTTON')
    .setCaption('Resume')
    .setConfirmationPopup(true)
    .setConfirmationPopupColor('green')
    .setConfirmationPopupMessage('Are you sure you want to resume this order?')
    .build(),
  new WidgetBuilder()
    .setIcon('fa-solid fa-circle-pause')
    .setId(4)
    .setType('BUTTON')
    .setCaption('Pause')
    .setConfirmationPopup(true)
    .setConfirmationPopupColor('yellow')
    .setConfirmationPopupMessage('Are you sure you want to pause this order?')
    .build(),
  new WidgetBuilder()
    .setIcon('fa-solid fa-rectangle-xmark')
    .setId(5)
    .setType('BUTTON')
    .setCaption('Cancel')
    .setConfirmationPopup(true)
    .setConfirmationPopupColor('red')
    .setConfirmationPopupMessage('Are you sure you want to cancel this order?')
    .build(),
];

import { Card } from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LightMode } from '../../redux/actions/light-actions';
import Footer from '../../components/footer';
import SideBar from '../../components/SideBar';
import React from 'react';
import TopBar from '../../components/Topbar';
import Topbarbg from '../../assets/images/Topbarbg.webp';
import Grid from '../../components/grid/grid';
import {
  cancelOrder,
  getAllOrders,
  markOrderPaid,
  markOrderReady,
  pauseOrder,
  resumeOrder,
} from '../../services/orders';
import { ordersGridColumns, ordersGridHeaderWidgets } from './Orders.config';
import getImageBlobUrl from '../../utils/file';
import dataItemNoImage from '../../assets/images/products/noImgProduct.webp';
import { GridBuilder } from '../../types/components/grid';
import { Binder } from '../../utils/binder';
import ReactDOMServer from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { RootState } from 'types/components/general';
import { useNotify } from 'utils/hooks/useNotify';
export default function UCP_Orders() {
  /****************************************************************************************************************************** */
  //-------------------------------------------------------------INITIALIZATION--------------------------------------------------//
  /******************************************************************************************************************************/
  const accessToken = useSelector((state: RootState) => state.userAccessToken);
  const LightModeState = useSelector((state: RootState) => state.lightMode);
  const [data, setData] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const { t } = useTranslation();
  const { displayNotification, displayPromiseNotification } = useNotify();
  var isLightMode = LightModeState == LightMode().type;
  React.useEffect(() => {
    isLightMode = LightModeState == LightMode().type;
  }, [LightModeState]);
  const gridConfiguration = new GridBuilder()
    .setDataField('idOrder')
    .setNoDataMessage('No Orders Found')
    .setGridTitle('List of Orders')
    .setOnSelectionChangeCallBackMethod(onSelectionChange)
    .build();
  function onSelectionChange(event) {
    setSelectedRows(event.selectedRowsData);
  }

  /**
   * This function is responsible for binding the configuration functions to the component's functions.
   */
  function bindConfigurationToComponent() {
    var toolbarWidgets = [
      { id: 0, callbackfunction: handleOrderInspect },
      { id: 1, callbackfunction: handleMarkOrderPaid },
      { id: 2, callbackfunction: handleMarkOrderReady },
      { id: 3, callbackfunction: handleOrderResume },
      { id: 4, callbackfunction: handleOrderPause },
      { id: 5, callbackfunction: handleOrderCancel },
    ];
    Binder(ordersGridHeaderWidgets, toolbarWidgets, 'callbackfunction', 'id');
  }

  function handleOrderInspect() {
    if (selectedRows.length == 0) {
      displayNotification(t('UCP.DialogMessages.Validation.noSelectionError'), 'info');
    } else if (selectedRows.length > 1) {
      displayNotification(t('UCP.DialogMessages.Validation.manySelectionError'), 'info');
    } else {
      window.location.href = '/UCP/Order?orderId=' + selectedRows[0].idOrder;
    }
  }
  /**
   * This function marks the selected Order as Paid
   */
  function handleMarkOrderPaid() {
    if (selectedRows.length == 0) {
      displayNotification(t('UCP.DialogMessages.Validation.noSelectionError'), 'info');
    } else if (selectedRows.length > 1) {
      displayNotification(t('UCP.DialogMessages.Validation.manySelectionError'), 'info');
    } else {
      try {
        var promise = markOrderPaid(selectedRows[0].idOrder, accessToken).then(() => {
          loadData();
        });
        displayPromiseNotification(promise, [], []);
      } catch (e) {
        //catch errors here.
      }
    }
  }
  /**
   * This function marks the selected Order as ready to be taken.
   */
  function handleMarkOrderReady() {
    if (selectedRows.length == 0) {
      displayNotification(t('UCP.DialogMessages.Validation.noSelectionError'), 'info');
    } else if (selectedRows.length > 1) {
      displayNotification(t('UCP.DialogMessages.Validation.manySelectionError'), 'info');
    } else {
      try {
        var promise = markOrderReady(selectedRows[0].idOrder, accessToken).then(() => {
          loadData();
        });
        displayPromiseNotification(promise, [t('UCP.DialogMessages.Validation.manySelectionError')], ['ORDER_ERROR09']);
      } catch (e) {
        //catch errors here.
      }
    }
  }
  /**
   * This function marks the selected Order as paused
   */
  function handleOrderPause() {
    if (selectedRows.length == 0) {
      displayNotification(t('UCP.DialogMessages.Validation.noSelectionError'), 'info');
    } else if (selectedRows.length > 1) {
      displayNotification(t('UCP.DialogMessages.Validation.manySelectionError'), 'info');
    } else {
      try {
        var promise = pauseOrder(selectedRows[0].idOrder, accessToken).then(() => {
          loadData();
        });
        displayPromiseNotification(promise, [], []);
      } catch (e) {
        /*Catch Logic here*/
      }
    }
  }
  /**
   * This function resumes the selected order
   */
  function handleOrderResume() {
    if (selectedRows.length == 0) {
      displayNotification(t('UCP.DialogMessages.Validation.noSelectionError'), 'info');
    } else if (selectedRows.length > 1) {
      displayNotification(t('UCP.DialogMessages.Validation.manySelectionError'), 'info');
    } else {
      try {
        var promise = resumeOrder(selectedRows[0].idOrder, accessToken).then(() => {
          loadData();
        });
        displayPromiseNotification(promise, [], []);
      } catch (e) {
        //catch errors here.
      }
    }
  }
  /**
   * This function cancel the selected Order
   */
  function handleOrderCancel() {
    if (selectedRows.length == 0) {
      displayNotification(t('UCP.DialogMessages.Validation.noSelectionError'), 'info');
    } else if (selectedRows.length > 1) {
      displayNotification(t('UCP.DialogMessages.Validation.manySelectionError'), 'info');
    } else {
      try {
        var promise = cancelOrder(selectedRows[0].idOrder, accessToken).then(() => {
          loadData();
        });
        displayPromiseNotification(promise, [], []);
      } catch (e) {
        //catch errors here.
      }
    }
  }
  bindConfigurationToComponent();
  React.useEffect(() => {
    loadData();
  }, []);
  async function loadData() {
    let newData = [];
    const requestResponse = await getAllOrders(accessToken);
    const promises = requestResponse.data.map(async (dataItem, index) => {
      let ordererProfileImg = dataItemNoImage;
      if (dataItem.createdBy.profileImage != null) {
        ordererProfileImg = await getImageBlobUrl(
          dataItem.createdBy.profileImage.extension,
          dataItem.createdBy.profileImage.fileBinary,
        );
      }

      var total = 0;
      dataItem.orderProducts.map((product, index) => {
        total += product.productPrice * dataItem.orderQuantities[index];
      });
      newData = [
        ...newData,
        {
          idOrder: dataItem.id,
          orderNum: '# ' + index,
          orderStatus: dataItem.orderStatus,
          orderProducts: dataItem.orderProducts,
          orderQuantity: dataItem.orderQuantities,
          orderCreationDate: dataItem.createDateTime,
          orderTotal: total,
          ordererProfileImg: ordererProfileImg,
          ordererEmail: dataItem.createdBy.email,
          ordererName: dataItem.createdBy.firstName + ' ' + dataItem.createdBy.lastName,
          ordererPhoneNumber: '(' + dataItem.createdBy.internationalDialNumber + ')' + dataItem.createdBy.phoneNumber,
        },
      ];
    });

    await Promise.all(promises);
    setData(newData);
  }

  return (
    <>
      <div className="flex flex-row items-stretch">
        <aside className={`background-secondary mb-2 rounded-b-xl p-4 shadow-lg hidden xl:block w-[20vw]`}>
          <SideBar />
        </aside>

        <main className=" w-full min-h-screen flex flex-col justify-start items-center ">
          <section
            className=" flex flex-col justify-center items-stretch w-full text-center h-[17vh] p-4 shadow-xl shadow-blue-gray-900/ bg-cover"
            style={{ backgroundImage: `url(${Topbarbg})` }}
          >
            <TopBar
              SectionName={t('UCP.TopNav.TabTitles.Orders')}
              Icon='<i className="fa-solid fa-clipboard-list"></i>'
            />
          </section>

          <section className="w-full flex justify-center  text-center">
            <Card
              className={`background-secondary p-2 w-full  min-h-[82vh] m-2 `}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Grid
                configuration={gridConfiguration}
                dataSource={data}
                columns={ordersGridColumns}
                widgets={ordersGridHeaderWidgets}
              />
            </Card>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

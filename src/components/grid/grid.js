import React from 'react';
import {
  DataGrid,
  FilterRow,
  HeaderFilter,
  GroupPanel,
  Scrolling,
  Grouping,
  Pager,
  Paging,
  Export,
  LoadPanel,
  SearchPanel,
  Column,
  ColumnChooser,
  ColumnFixing,
  Toolbar,
  Item,
  Selection,
} from 'devextreme-react/data-grid';
import { Button, Avatar, Chip, Typography, IconButton, Tooltip } from '@material-tailwind/react';
import { ColumnBuilder } from '../../types/components/column';
import PropTypes from 'prop-types';
import './grid.css';
import ConfirmDialog from '../Dialog/Confirm';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
const dummyData = [
  { id: 0, name: 'HONDA', subName: 'MSX125', qt: 5 },
  { id: 1, name: 'HONDA', subName: 'MSX200', qt: 4 },
  { id: 2, name: 'HONDA', subName: 'MSX50', qt: 1 },
];
const dummyColumns = [
  new ColumnBuilder().setCaption('NAME').setDataField('name').build(),
  new ColumnBuilder().setCaption('MODEL').setDataField('subName').build(),
  new ColumnBuilder().setCaption('QTE').setDataField('qt').build(),
];
Grid.propTypes = {
  dataSource: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  widgets: PropTypes.array.isRequired,
  configuration: PropTypes.object.isRequired,
};
export default function Grid({ dataSource, configuration, columns, widgets }) {
  const [widgetPopupsVisibility, setWidgetPopupsVisibility] = React.useState(
    widgets.map((widget) => {
      return { widgetId: widget.id, isPopupOpen: false };
    }),
  );

  const updateWidgetPopupsVisibility = (id, newPopupStatus) => {
    setWidgetPopupsVisibility((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates.find((widgetPopupVisibility) => widgetPopupVisibility.widgetId == id).isPopupOpen = newPopupStatus;
      return updatedStates;
    });
  };
  const allowedPageSizes = [7, 10, 'all'];
  const dataGridRef = React.useRef(null);

  const onExporting = (e) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
      });
    });
  };
  /****************************************************************************************************************************
   * ----------------------------------------------------GRID TEMPLATES--------------------------------------------------------
   * ***************************************************************************************************************************/
  const ImageCellTemplate = (row) => {
    var datafield = row.column.dataField;
    var src = row.data[datafield];
    return <Avatar variant="circular" size="sm" className="border border-blue-500 " src={src} />;
  };

  const highLightTemplate = (row) => {
    var columnTemplateData = columns.find((col) => col.dataField == row.column.dataField).templateData;
    return (
      <Chip
        size="sm"
        className=" max-w-[7rem] text-center"
        variant="filled"
        value={row.value}
        color={
          row.value === 'High Stock' || row.value === 'Ready' || row.value === 'PAID'
            ? 'green'
            : row.value === 'PAUSED' || row.value === 'PENDING'
            ? 'amber'
            : row.value === 'Low Stock' || row.value === 'READY'
            ? 'pink'
            : 'red'
        }
      />
    );
  };

  return (
    <div className="maingrdContainer">
      {/***********************************************************************************************************************
       * -----------------------------------------------TOOL BAR HEADER--------------------------------------------------------
       ***********************************************************************************************************************/}
      <div className="grdHeader">
        <div className="grdTitle">
          <Typography variant="h5">{configuration.gridTitle}</Typography>
          <Typography className="mt-1 font-normal">{configuration.gridTitleDescription}</Typography>
        </div>
        <div className="toolbar">
          {widgets.map((widget, index) => {
            if (widget.hasConfirmationPopup == true) {
              return (
                <>
                  <Tooltip content={widget.caption}>
                    <IconButton
                      variant="text"
                      key={index}
                      size={widget.size}
                      onClick={() => {
                        updateWidgetPopupsVisibility(
                          widget.id,
                          !widgetPopupsVisibility.find((widgetPopup) => widgetPopup.widgetId == widget.id).isPopupOpen,
                        );
                      }}
                      className=" mx-1"
                    >
                      <i className={widget.icon}></i>
                    </IconButton>
                  </Tooltip>
                  <ConfirmDialog
                    Open={widgetPopupsVisibility.find((widgetPopup) => widgetPopup.widgetId == widget.id).isPopupOpen}
                    Action={widget.callbackfunction}
                    HandleOpen={() => {
                      updateWidgetPopupsVisibility(
                        widget.id,
                        !widgetPopupsVisibility.find((widgetPopup) => widgetPopup.widgetId == widget.id).isPopupOpen,
                      );
                    }}
                    color={widget.confirmationPopupColor}
                    Icon={widget.icon}
                    Title={widget.confirmationPopupTitle}
                    Content={widget.confirmationPopupMessage}
                  />
                </>
              );
            } else {
              return (
                <>
                  <Tooltip content={widget.caption}>
                    <IconButton
                      variant="text"
                      size={widget.size}
                      onClick={() => widget.callbackfunction()}
                      className=" mx-1"
                    >
                      <i className={widget.icon}></i>
                    </IconButton>
                  </Tooltip>
                </>
              );
            }
          })}
        </div>
      </div>
      {/***********************************************************************************************************************
       * -----------------------------------------------Main GRID-----------------------------------------------------------------
       *************************************************************************************************************************/}
      <DataGrid
        id="gridContainer"
        ref={dataGridRef}
        dataSource={dataSource}
        showBorders={true}
        showColumnLines={false}
        showRowLines={true}
        keyExpr={configuration.dataField}
        defaultFocusedRowKey={2}
        rowAlternationEnabled={true}
        onSelectionChanged={configuration.onSelectionChangeCallBackMethod}
        columnResizingMode={'nextColumn'}
        columnHidingEnabled={true}
        columnAutoWidth={true}
        allowColumnResizing={true}
        onExporting={onExporting}
      >
        <Paging defaultPageSize={7} />
        <Pager
          visible={true}
          allowedPageSizes={allowedPageSizes}
          displayMode={'full'}
          showPageSizeSelector={true}
          showInfo={true}
          showNavigationButtons={true}
        />
        <Selection mode="multiple" selectAllMode={'allPages'} showCheckBoxesMode={'always'} />
        <LoadPanel enabled={true} />
        <GroupPanel emptyPanelText="Eeey" visible={true} autoExpandAll={false} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Export enabled={true} allowExportSelectedData={true} />
        <ColumnChooser enabled={true} />
        <ColumnFixing enabled={true} />
        <Grouping autoExpandAll={true} />
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <GroupPanel visible={true} />
        <Grouping autoExpandAll={false} />
        {columns.map((column, index) => {
          if (column.type == 'IMG') {
            return (
              <Column
                key={index}
                width={column.width}
                allowSearch={false}
                allowExporting={false}
                allowFiltering={false}
                allowHeaderFiltering={false}
                alignment="center"
                dataField={column.dataField}
                caption={column.caption}
                dataType={column.dataType}
                allowGrouping={column.allowGrouping}
                height={column.height}
                hidingPriority={column.hidingPriority == 'auto' ? 0 : column.hidingPriority}
                cellRender={(event) => ImageCellTemplate(event)}
              ></Column>
            );
          } else {
            if (column.template == 'HIGHLIGHT') {
              return (
                <Column
                  width={column.width}
                  allowSearch={column.allowSearch}
                  allowExporting={column.allowExporting}
                  allowFiltering={column.allowFiltering}
                  allowHeaderFiltering={column.allowFiltering}
                  alignment={column.alignment}
                  key={index}
                  dataField={column.dataField}
                  caption={column.caption}
                  dataType={column.dataType}
                  allowGrouping={column.allowGrouping}
                  height={column.height}
                  hidingPriority={column.hidingPriority == 'auto' ? 0 : column.hidingPriority}
                  cellRender={(event) => highLightTemplate(event)}
                ></Column>
              );
            } else {
              return (
                <Column
                  width={column.width}
                  allowSearch={column.allowSearch}
                  allowExporting={column.allowExporting}
                  allowFiltering={column.allowFiltering}
                  allowHeaderFiltering={column.allowFiltering}
                  alignment={column.alignment}
                  key={index}
                  dataField={column.dataField}
                  caption={column.caption}
                  dataType={column.dataType}
                  height={column.height}
                  hidingPriority={column.hidingPriority}
                  allowGrouping={column.allowGrouping}
                ></Column>
              );
            }
          }
        })}

        <Toolbar>
          <Item name="groupPanel" />
          <Item name="addRowButton" showText="always" />
          <Item name="exportButton" />
          <Item name="columnChooserButton" />
          <Item name="searchPanel" />
          <Item name="applyFilterButton" />
          <Item name="revertButton" />
          <Item name="saveButton" />
        </Toolbar>
        {/* <Summary>
          <TotalItem column="StockRoom_Quantity" summaryType="sum">
            <ValueFormat type="decimal" precision={2} />
          </TotalItem>
          <TotalItem column="Shop_Quantity" summaryType="sum">
            <ValueFormat type="decimal" precision={2} />
          </TotalItem>
        </Summary> */}
      </DataGrid>
    </div>
  );
}

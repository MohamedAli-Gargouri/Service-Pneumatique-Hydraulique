import React from 'react';
import { LightMode, DarkMode } from '../../redux/actions/LightActions';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Checkbox,
  Input,
  Button,
} from '@material-tailwind/react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? 'rotate-180' : ''
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export default function AccordionCustom() {
  const [open, setOpen] = React.useState(0);
  const LightModeState = useSelector((state) => state.lightMode);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion
        className={`${
          LightModeState == LightMode().type
            ? 'tc-whiteTheme_T1'
            : 'tc-darkTheme_T1'
        }`}
        open={open === 1}
        icon={<Icon id={1} open={open} />}
      >
        <AccordionHeader
          className={`${
            LightModeState == LightMode().type
              ? 'tc-whiteTheme_T1'
              : 'tc-darkTheme_T1'
          }`}
          onClick={() => handleOpen(1)}
        >
          <i class="fa-solid fa-bars"></i> Category
        </AccordionHeader>
        <AccordionBody>
          <List
            className={`${
              LightModeState == LightMode().type
                ? 'tc-whiteTheme_T1'
                : 'tc-darkTheme_T1'
            }`}
          >
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-react"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-react"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: 'p-0',
                    }}
                  />
                </ListItemPrefix>
                <Typography className="font-medium">Compressor</Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-vue"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-vue"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: 'p-0',
                    }}
                  />
                </ListItemPrefix>
                <Typography className="font-medium">Tubes</Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-svelte"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-svelte"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: 'p-0',
                    }}
                  />
                </ListItemPrefix>
                <Typography className="font-medium">Secheur</Typography>
              </label>
            </ListItem>
          </List>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader
          className={`${
            LightModeState == LightMode().type
              ? 'tc-whiteTheme_T1'
              : 'tc-darkTheme_T1'
          }`}
          onClick={() => handleOpen(2)}
        >
          <i class="fa-solid fa-list"></i> Brand
        </AccordionHeader>
        <AccordionBody>
          <List
            className={`${
              LightModeState == LightMode().type
                ? 'tc-whiteTheme_T1'
                : 'tc-darkTheme_T1'
            }`}
          >
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-react"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-react"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: 'p-0',
                    }}
                  />
                </ListItemPrefix>
                <Typography className="font-medium">Hertz</Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-vue"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-vue"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: 'p-0',
                    }}
                  />
                </ListItemPrefix>
                <Typography className="font-medium">AMI</Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-svelte"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-svelte"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: 'p-0',
                    }}
                  />
                </ListItemPrefix>
                <Typography className="font-medium">SOMCEF</Typography>
              </label>
            </ListItem>
          </List>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader
          className={`${
            LightModeState == LightMode().type
              ? 'tc-whiteTheme_T1'
              : 'tc-darkTheme_T1'
          }`}
          onClick={() => handleOpen(3)}
        >
          <i class="fa-solid fa-up-right-and-down-left-from-center"></i> size
        </AccordionHeader>
        <AccordionBody>
          <List
            className={`${
              LightModeState == LightMode().type
                ? 'tc-whiteTheme_T1'
                : 'tc-darkTheme_T1'
            }`}
          >
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-react"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-react"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: 'p-0',
                    }}
                  />
                </ListItemPrefix>
                <Typography className="font-medium">50ML</Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-vue"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-vue"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: 'p-0',
                    }}
                  />
                </ListItemPrefix>
                <Typography className="font-medium">100ML</Typography>
              </label>
            </ListItem>
            <ListItem className="p-0">
              <label
                htmlFor="vertical-list-svelte"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="vertical-list-svelte"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: 'p-0',
                    }}
                  />
                </ListItemPrefix>
                <Typography className="font-medium">200ML</Typography>
              </label>
            </ListItem>
          </List>
        </AccordionBody>
      </Accordion>
      <div className="mt-4 Price Range flex justify-start w-full flex-wrap">
        <div className="MinPrice my-4 w-full">
          <Input
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            type="number"
            label="Minimum Price"
          />
        </div>

        <div className="MaxPrice my-4 w-full">
          <Input
            labelProps={{
              style: {
                color: LightModeState == LightMode().type ? 'black' : 'white',
              },
            }}
            type="number"
            label="Maxiumum Price"
          />
        </div>

        <div className="MaxPrice my-4 w-full flex justify-center">
          <Button className="flex items-center gap-3">
            <i class="fa-solid fa-filter"></i>
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
}

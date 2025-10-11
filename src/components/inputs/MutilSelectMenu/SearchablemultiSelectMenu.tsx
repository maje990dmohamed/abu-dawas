import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import useAutocomplete, {
  type AutocompleteGetItemProps,
  type UseAutocompleteProps,
} from '@mui/material/useAutocomplete';
import insuranceIcon from "../../../assets/icons/insurance.svg";
import ErrorInput from '../errorTooltip/ErrorInput';

const Root = styled('div')(({ theme }) => ({
  color: 'rgba(0,0,0,0.85)',
  fontSize: '14px',
  ...theme.applyStyles('dark', {
    color: 'rgba(255,255,255,0.65)',
  }),
}));

const Label = styled('label')`
  padding: 0 0 10px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')(() => ({
  width: '100%',
  border: '1px solid #d9d9d9',
  backgroundColor: 'transparent',
  borderRadius: '10px',
  display: 'flex',
  flexWrap: 'wrap',
  overflow: "hidden",
  color:"#000",

  '&:hover': {
    borderColor: '#9C00C9',

  },
  '&.focused': {
    borderColor: '#9C00C9',
  },
  '&.error': {
    borderColor: '#E33629 !important',  // ✅ الأحمر
  },
  '& input': {
    backgroundColor: 'tansparent',
    color: '#9C00C9',
    boxSizing: 'border-box',
    padding: '4px 6px',
    width: '0',
    minWidth: '30px',
    flexGrow: 1,
    border: 0,
    margin: 0,
    outline: 0,
  },
}));


interface ItemProps extends ReturnType<AutocompleteGetItemProps<true>> {
  label: string;
}

function Item(props: ItemProps) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const StyledItem = styled(Item)<ItemProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '24px',
  margin: '2px',
  lineHeight: '22px',
  backgroundColor: '#fafafa',
  border: `1px solid #e8e8e8`,
  borderRadius: '20px',
  boxSizing: 'content-box',
  padding: ' 5px  10px',
  outline: 0,
  overflow: 'hidden',
  marginTop: "8px",
  color:"#000",

  '&:focus': {
    borderColor: '#40a9ff',
    backgroundColor: '#e6f7ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#003b57',
      borderColor: '#177ddc',
    }),
  },
  '& span': {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  '& svg': {
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px',
    color: "red"
  },
}));

function CustomAutocomplete<Value>(
  props: UseAutocompleteProps<Value, true, false, false> & {
    icon?: string;
    label?: string;
    isRequired?: boolean;
    handleParentsChange?: (value: Value[]) => void;
    error: string
    placeholder: string
    handleEmailFieldChangeParent: any
    setErrors: any
    formData: any
  }
) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getItemProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    multiple: true,
    options: props.options,
    getOptionLabel: props.getOptionLabel,
    value: props.value,
    isOptionEqualToValue: (option, value) => (option as any)?.id === (value as any)?.id,  
    onChange: (event, newValue) => {
      console.log(event);
      
      if (props.handleParentsChange) {
        props.handleParentsChange(newValue);
      }

      if (newValue.length > 0 && props.error) {
        props.setErrors({
          available_parents: "",
          recepients: "",
        });
      }
    },
  });



  const Listbox = styled('ul')(({ theme }) => ({
    width: '90%',
    margin: '2px 0 0',
    padding: 0,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: '#ffff',
    overflow: 'auto',
    maxHeight: '250px',
    borderRadius: '4px',
    zIndex: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: '#141414',
    }),
    '& li': {
      padding: '5px 12px',
      display: 'flex',
      color: "#000",
      '& span': {
        flexGrow: 1,
      },
      '& svg': {
        color: 'transparent',
      },
    },
    "& li[aria-selected='true']": {
      backgroundColor: '#fafafa',
      fontWeight: 600,
      ...theme.applyStyles('dark', {
        backgroundColor: '#2b2b2b',
      }),
      '& svg': {
        color: '#1890ff',
      },
    },
    [`& li.${autocompleteClasses.focused}`]: {
      backgroundColor: '#e6f7ff',
      cursor: 'pointer',
      ...theme.applyStyles('dark', {
        backgroundColor: '#003b57',
      }),
      '& svg': {
        color: 'currentColor',
      },
    },
  }));
  

  const isRTL = true;
  return (
    <Root>
      <div className="mt-4" {...getRootProps()}>
        <Label sx={{ fontWeight: "600", fontSize: "16px" }} {...getInputLabelProps()}>
          <span className=' '>  {props.label} </span>
        </Label>

        <div className='relative'>
          <InputWrapper
            ref={setAnchorEl}
            className={`${focused ? "focused" : ""} ${props.error ? "error" : ""}  ${props?.icon ? `!p-0 ` : ""} !rounded-[16px] !text-black overflow-x-auto `}
          >
            {<div
              className={`w-[59px] shadow-md !min-h-full h-[50px] !text-black  ml-3 bg-[#9C00C9] flex items-center justify-center p-4
            ${isRTL
                  ? "rounded-s-[16px] border-s-0"
                  : "rounded-s-[16px] border-e-0"
                }
            ${props.error ? "border border-[#E33629]" : ""}
            `}
            >
              <img src={insuranceIcon} alt="" className="w-6 h-6" />
            </div>}
            {value.map((option, index) => {
              const { key, ...itemProps } = getItemProps({ index });
              return (
                <StyledItem
                  key={index}
                  {...itemProps}
                  label={props.getOptionLabel!(option)}
                />
              );
            })}
            <input
              onChange={(e: any) => props.handleEmailFieldChangeParent("available_parents", e)}
              {...getInputProps()}
              placeholder={
                props?.placeholder
              }
            />
          </InputWrapper>
          <ErrorInput error={props.error} />
        </div>

      </div>
      {groupedOptions?.length > 0 ? (
        <Listbox  {...getListboxProps()}>
          {groupedOptions.map((option: any, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            return (
              <li className='flex items-center hover:!bg-[#9C00C9]/10' key={`${crypto.randomUUID()}`} {...optionProps}>
                <img
                  src={option?.avatar || option?.image}
                  alt={props.getOptionLabel!(option)}
                  className="w-10 h-10 rounded-full object-cover me-2"
                />
                <span>{props.getOptionLabel!(option)}</span>
                <CheckIcon fontSize="small" color={"primary"} />
              </li>
            );
          })}
        </Listbox>
      ) : null}


    </Root>
  );
}

export default function CustomizedHook({
  listOfParents,
  value,
  icon,
  label,
  handleParentsChange,
  error,
  setErrors,
  formData,
  placeholder,
  handleEmailFieldChangeParent,
  isRequired
}: any) {
  return (
    <CustomAutocomplete
      id="customized-hook-demo"
      options={listOfParents}
      value={value}
      getOptionLabel={(option: any) => option.name}
      icon={icon}
      isRequired={isRequired}
      label={label}
      handleParentsChange={handleParentsChange}
      error={error}
      placeholder={placeholder}
      handleEmailFieldChangeParent={handleEmailFieldChangeParent}
      setErrors={setErrors}
      formData={formData}
    />
  );
}


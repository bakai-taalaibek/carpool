import { Box, Combobox, InputBase, useCombobox } from "@mantine/core";
import { useMemo, useState } from "react";
import { useGetLocalitiesQuery } from "../../services/localitiesApi";
import { LocalityFullDto } from "../../types/locality";

function normalizeForSearchString(input: string) {
  if (!input) {
    return "";
  }

  input = input.toLowerCase();

  input = input
    .replace(/дж/g, "ж")
    .replace(/у/g, "ү")
    .replace(/ю/g, "ү")
    .replace(/е/g, "ө")
    .replace(/о/g, "ө")
    .replace(/ё/g, "ө")
    .replace(/ /g, "")
    .replace(/-/g, "");

  return input;
}

function getFilteredData(data: LocalityFullDto[] | undefined, param: string) {
  if (data === undefined) {
    return [];
  }

  if (param === "") {
    return data.slice(0, 100);
  }

  const result = [];
  for (const item of data) {
    if (result.length === 100) {
      break;
    }

    if (item.searchString.includes(normalizeForSearchString(param.trim()))) {
      result.push(item);
    }
  }

  return result;
}

type TProps = {
  placeholder: string;
  label?: string;
};

export default function LocalitySelect({ placeholder, label }: TProps) {
  const [localityId, setLocalityId] = useState<string>("");
  const [userSearchString, setUserSearchString] = useState("");

  const { data } = useGetLocalitiesQuery();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  function getLocalityNameById(id: string) {
    return data?.find((item) => item.id.toString() === id)?.name || "";
  }

  const localityName = useMemo(
    () => getLocalityNameById(localityId),
    [data, localityId]
  );

  const filteredOptions = getFilteredData(data, userSearchString);

  const options = filteredOptions?.map((item) => (
    <Combobox.Option value={item.id.toString()} key={item.id}>
      <Box>
        {item.name}
        {item.oldName && ` (б.\u00A0${item.oldName})`}
      </Box>
      {item.regionName && (
        <Box c="gray.6" fz={12}>
          {item.regionName} область
        </Box>
      )}
      {item.districtName && (
        <Box c="gray.5" fz={12}>
          {item.districtName} район
        </Box>
      )}
      {item.aimakName && (
        <Box c="gray.5" fs="italic" fz={12}>
          {item.aimakName} аймак
        </Box>
      )}
    </Combobox.Option>
  ));

  return (
    <Combobox
      width={180}
      store={combobox}
      // withinPortal={false}
      onOptionSubmit={(val) => {
        setLocalityId(val);
        setUserSearchString(getLocalityNameById(val));
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          // rightSection={<Combobox.Chevron />}
          value={userSearchString}
          onChange={(event) => {
            combobox.openDropdown();
            // combobox.updateSelectedOptionIndex();
            setUserSearchString(event.currentTarget.value);
          }}
          onClick={() => {
            combobox.openDropdown();
            setUserSearchString("");
          }}
          onFocus={() => {
            combobox.openDropdown();
            setUserSearchString("");
          }}
          onBlur={() => {
            combobox.closeDropdown();
            setUserSearchString(localityName);
          }}
          placeholder={localityName === "" ? placeholder : localityName}
          label={label}
          required
          // rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown mah={270} style={{ overflowY: "auto" }}>
        <Combobox.Options>
          {!options || options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Ничего не найдено</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

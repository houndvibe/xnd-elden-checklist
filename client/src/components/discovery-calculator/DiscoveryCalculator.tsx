import { useEffect, useMemo, useState } from "react";
import { Flex, InputNumber, Switch } from "antd";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/typedDispatch";
import { setCalculatedDiscovery } from "../../store/discoverySlice";

import { DiscoveryItemSelect } from "./DiscoveryItemsSelect";
import ExamplesTable from "./ExamplesTable";

import { discoveryData, DiscoveryItem } from "./data-discovery";
import { BASE_DISCOVERY } from "../../lib/consts";

import styles from "./DiscoveryCalculator.module.scss";

type NullableString = string | null;
type SelectorProps = {
  value: NullableString;
  onChange: React.Dispatch<React.SetStateAction<NullableString>>;
};

const AmuletSelect = ({ value, onChange }: SelectorProps) => (
  <DiscoveryItemSelect
    items={discoveryData.amulets}
    placeholder="Select an amulet"
    value={value}
    onChange={onChange}
  />
);

const HelmetSelect = ({ value, onChange }: SelectorProps) => (
  <DiscoveryItemSelect
    items={discoveryData.helmets}
    placeholder="Select a helmet"
    value={value}
    onChange={onChange}
  />
);

const ConsumableSelect = ({ value, onChange }: SelectorProps) => (
  <DiscoveryItemSelect
    items={discoveryData.consumables}
    placeholder="Select a consumable"
    value={value}
    onChange={onChange}
  />
);

export default function DiscoveryCalculator() {
  const dispatch = useDispatch();
  const storedDiscovery = useAppSelector(
    (state) => state.discovery.calculatedDiscovery
  );

  const [arcane, setArcane] = useState(0);
  const [rune, setRune] = useState(false);
  const [oath, setOath] = useState(false);
  const [chest, setChest] = useState(false);
  const [amulet, setAmulet] = useState<NullableString>(null);
  const [helm, setHelm] = useState<NullableString>(null);
  const [consumable, setConsumable] = useState<NullableString>(null);

  const getItemEffect = (name: NullableString, source: DiscoveryItem[]) => {
    const item = source.find((i) => i.name === name);
    return item ? item.effect.arcaneGain + item.effect.discoveryGain : 0;
  };

  const calculatedDiscovery = useMemo(() => {
    return (
      BASE_DISCOVERY +
      arcane +
      getItemEffect(amulet, discoveryData.amulets) +
      getItemEffect(helm, discoveryData.helmets) +
      getItemEffect(consumable, discoveryData.consumables) +
      (rune ? 5 : 0) +
      (oath ? 5 : 0) +
      (chest ? 2 : 0)
    );
  }, [arcane, rune, oath, chest, amulet, helm, consumable]);

  useEffect(() => {
    dispatch(setCalculatedDiscovery(calculatedDiscovery));
  }, [calculatedDiscovery, dispatch]);

  const formFields = [
    {
      label: "Arcane",
      component: (
        <InputNumber
          min={0}
          max={99}
          value={arcane}
          onChange={(v) => setArcane(v ?? 0)}
          className={styles.inputNumber}
        />
      ),
    },
    {
      label: "Godrick's Great Rune",
      component: <Switch checked={rune} onChange={setRune} />,
    },
    {
      label: "Oath of Vengeance",
      component: <Switch checked={oath} onChange={setOath} />,
    },
    {
      label: "Thiollier's Garb",
      component: <Switch checked={chest} onChange={setChest} />,
    },
    {
      label: "Amulet",
      component: <AmuletSelect value={amulet} onChange={setAmulet} />,
    },
    {
      label: "Helm",
      component: <HelmetSelect value={helm} onChange={setHelm} />,
    },
    {
      label: "Consumable",
      component: (
        <ConsumableSelect value={consumable} onChange={setConsumable} />
      ),
    },
  ];

  return (
    <div className={styles.calculator}>
      <Flex className={styles.mainFlex}>
        <Flex vertical className={styles.formContainer}>
          {formFields.map(({ label, component }, idx) => (
            <div key={idx} className={styles.formRow}>
              <label className={styles.label}>{label}</label>
              {component}
            </div>
          ))}
        </Flex>

        <Flex vertical className={styles.resultsContainer}>
          <div className={styles.totalLabel}>Total discovery:</div>
          <div className={styles.totalValue}>{storedDiscovery}</div>
        </Flex>

        <Flex vertical gap={10}>
          <ExamplesTable calculatedDiscovery={storedDiscovery} />
        </Flex>
      </Flex>
    </div>
  );
}

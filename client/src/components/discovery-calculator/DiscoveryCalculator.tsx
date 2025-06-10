import { Flex, InputNumber, Switch } from "antd";
import styles from "./DiscoveryCalculator.module.scss";
import { discoveryData, DiscoveryItem } from "./data-discovery";
import { DiscoveryItemSelect } from "./DiscoveryItemsSelect";
import { useEffect, useMemo, useState } from "react";
import { BASE_DISCOVERY } from "../../lib/consts";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/typedDispatch";
import { setCalculatedDiscovery } from "../../store/discoverySlice";
import ExamplesTable from "./ExamplesTable";

type SelectComponentProps = {
  value: string | null;
  onChange: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function DiscoveryCalculator() {
  const dispatch = useDispatch();
  const storedDiscovery = useAppSelector(
    (state) => state.discovery.calculatedDiscovery
  );
  const [arcane, setArcane] = useState<number>(0);
  const [rune, setRune] = useState<boolean>(false);
  const [oath, setOath] = useState<boolean>(false);
  const [chest, setChest] = useState<boolean>(false);
  const [amulet, setAmulet] = useState<string | null>(null);
  const [helm, setHelm] = useState<string | null>(null);
  const [consumable, setConsumable] = useState<string | null>(null);

  const AmuletSelect = ({ value, onChange }: SelectComponentProps) => (
    <DiscoveryItemSelect
      items={discoveryData.amulets}
      placeholder="Select an amulet"
      value={value}
      onChange={onChange}
    />
  );

  const HelmetSelect = ({ value, onChange }: SelectComponentProps) => (
    <DiscoveryItemSelect
      items={discoveryData.helmets}
      placeholder="Select a helmet"
      value={value}
      onChange={onChange}
    />
  );

  const ConsumableSelect = ({ value, onChange }: SelectComponentProps) => (
    <DiscoveryItemSelect
      items={discoveryData.consumables}
      placeholder="Select a consumable"
      value={value}
      onChange={onChange}
    />
  );

  const calculatedDiscovery = useMemo(() => {
    const getItemEffect = (itemName: string | null, items: DiscoveryItem[]) => {
      if (!itemName) return 0;
      const item = items.find((item) => item.name === itemName);
      return item ? item.effect.arcaneGain + item.effect.discoveryGain : 0;
    };

    return (
      BASE_DISCOVERY +
      arcane +
      getItemEffect(amulet, discoveryData.amulets) +
      getItemEffect(helm, discoveryData.helmets) +
      getItemEffect(consumable, discoveryData.consumables) +
      (oath ? 5 : 0) +
      (rune ? 5 : 0) +
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
          onChange={(value) => setArcane(value || 0)}
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
          {formFields.map((field, index) => (
            <div key={index} className={styles.formRow}>
              <label className={styles.label}>{field.label}</label>
              {field.component}
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

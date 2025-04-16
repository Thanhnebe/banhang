import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type Subdivisions = {
    location: {
        province: string;
        district: string;
        ward: string;
    }
}

export interface DistrictMapEntity {
    district_id: string;
    name: string;
    gso_id: string;
    province_id: string;
}

export interface ProvinceMapEntity {
    province_id: string;
    name: string;
    gso_id: string;
}

export interface WardMapEntity {
    ward_id: string;
    name: string;
    gso_id: string;
    district_id: string;
}

export interface IndexMapEntity {
    districts: DistrictMapEntity[];
    province: ProvinceMapEntity;
    wards: WardMapEntity[];
}

export type LocationParams = {
    province: ProvinceMapEntity;
    district: DistrictMapEntity;
    ward: WardMapEntity;
}

type ChooseAddressParams = {
    previousScreen: {
        previousScreen: string
    }
}

export type SubdivisionsParams = NativeStackScreenProps<Subdivisions, 'location'>

export type TypeEditAddressParmas = NativeStackScreenProps<ChooseAddressParams, 'previousScreen'>;
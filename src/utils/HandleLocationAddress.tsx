import { DistrictMapEntity, ProvinceMapEntity, WardMapEntity } from "../model/entity/IndexMap.entity";

export class HandleLocationAddress {
    static handleSelectProvince = (province: ProvinceMapEntity, setSelectedProvince: any, setSelectedDistrict: any, setSelectedWard: any) => {
        setSelectedProvince(province);
        setSelectedDistrict(null);
        setSelectedWard(null);
    };
    static handleSelectDistrict = (district: DistrictMapEntity, setSelectedDistrict: any, setSelectedWard: any) => {
        setSelectedDistrict(district);
        setSelectedWard(null);
    };
    static handleSelectWard = (ward: WardMapEntity, setSelectedWard: any, district: any, province: any, navigation: any, previousScreen: any) => {
        setSelectedWard(ward);
        navigation.navigate(previousScreen, {
            ward: ward.name,
            district: district.name,
            province: province.name,
        })
    };
    
}

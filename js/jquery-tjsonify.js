(function ($) {
    $.fn.tjsonify = function (options) {
        let settings = $.extend({
                th: true,
                validation: false
            }, options),
            headRow = this.find('tr').first(),
            headTag = settings.th ? "th" : "td",
            bodyRows = this.find('tr').not(headRow),
            allColumns = headRow.find(headTag),
            validateAllowence = function (value, allowed, fallback) {
                const allowedPair = allowed.split('|'),
                    keyword = allowedPair[0],
                    format = allowedPair[1];
                switch (keyword) {
                    case "empty":
                        return value == "" ? fallback : value;
                    case "date":
                        const dateFormat = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);
                        return dateFormat.test(value)?value:fallback;
                }
            };
        return bodyRows.map(function () {
            const rowObj = {},
                settingValidation = settings.validation,
                _this = $(this);
            for (let index = 0; index < allColumns.length; index++) {
                const key = allColumns.eq(index).text().toLowerCase().trim().replace(/ /g, "_");
                let value = _this.find('td').eq(index).text().trim();
                if (settingValidation) {
                    if (settingValidation[index]) {
                        const allowed = settingValidation[index][0],
                            fallback = settingValidation[index][1];
                        value = validateAllowence(value, allowed, fallback);
                    }
                }
                rowObj[key] = value;
            }
            return rowObj;
        }).get();
    };
}(jQuery))
var templates = [
    {   
        name: 'Addition',
        category: 'Arithmetic',
        template: '<mrow><mi>{{a}}</mi><mo>+</mo><mi>{{b}}</mi></mrow>',
        hotkey: null, 
    },

    {   
        name: 'Subtraction',
        category: 'Arithmetic',
        template: '<mrow><mi>{{a}}</mi><mo>-</mo><mi>{{b}}</mi></mrow>',
        hotkey: null, 
    },

    {
        name: 'Power',
        category: 'Arithmetic',
        template: '<mrow><msup><mi>{{a}}</mi><mi>{{b}}</mi></msup></mrow>',
        hotkey: null, 
    },

    {
        name: 'Hydrogen',
        category: 'Chemistry',
        template: '<mmultiscripts><mn>H</mn><none/><none/><mprescripts/><mn>1</mn><mn>1</mn></mmultiscripts>',
        hotkey: null, 
    },
    
    {
        name: 'Uranium-235',
        category: 'Chemistry',
        template: '<mmultiscripts><mn>U</mn><none/><none/><mprescripts/><mn>92</mn><mn>235</mn></mmultiscripts>',
        hotkey: null, 
    },

    {
        name: 'Integral',
        category: 'Calculus',
        template: '<mrow><mo>∫</mo> <mrow> {{a}} <mrow> <mo>d</mo> <mi> {{b}} </mi> </mrow> </mrow> </mrow>',
        hotkey: null, 
    },

    {
        name: 'Derivative',
        category: 'Calculus',
        template: '<mfrac><mrow><mi>d</mi><mi>{{a}}</mi></mrow><mrow><mi>d</mi><mi>{{b}}</mi></mrow></mfrac>',
        hotkey: null, 
    },

]

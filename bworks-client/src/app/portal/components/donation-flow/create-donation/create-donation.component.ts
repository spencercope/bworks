import { Component, Inject, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DonorVm, ItemClient, ItemVm, ItemVmType, ItemVmStatus } from '../../../../app.api';

interface NewItem {
  id?: string;
  type: ItemVmType;
  notes: string;
  barcodeId?: string;
}

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.scss'],
})
export class CreateDonationComponent implements OnInit {
  @Input() donor: DonorVm;
  @Input() showDialog: boolean;
  @Output() onClose = new EventEmitter<any>();

  // figure out a better way
  options = [
    { label: 'Bike', value: 'Bike' },
    { label: 'PC', value: 'PC' },
    { label: 'Part', value: 'Part' },
    { label: 'Misc', value: 'Misc' },
  ];

  newItems: NewItem[] = [];
  isOffsite = false;
  barcodeId = '';
  constructor(private itemClient: ItemClient) {}

  ngOnInit() {
    this.createNewItem();
  }

  private createNewItem() {
    this.newItems.push({ type: ItemVmType.Bike, notes: '', barcodeId: '' });
  }

  save(index: number) {
    const item = this.newItems[index];

    if (this.isOffsite) {
      if (!item.barcodeId) {
        return;
      }

      const vm = new ItemVm();
      vm.notes = item.notes;
      vm.type = item.type;
      vm.status = ItemVmStatus.Donated;
      console.log(vm);
      this.itemClient.createBaseItem(vm, this.donor.id, this.isOffsite, item.barcodeId).subscribe(response => {
        this.newItems.splice(index, 1, { ...item, id: response.id });
        this.createNewItem();
      });
    } else {
      const vm = new ItemVm();
      vm.notes = item.notes;
      vm.type = item.type;
      vm.status = ItemVmStatus.Donated;

      this.itemClient.createBaseItem(vm, this.donor.id).subscribe(response => {
        this.newItems.splice(index, 1, { ...item, id: response.id, barcodeId: response.barcodeId });
        this.createNewItem();
      });
    }
  }

  printBarcode(text: string) {
    console.log('printBarcode');
    const xhr = new XMLHttpRequest();
    console.log('beforeOnload');
    xhr.onload = function() {
      const reader = new FileReader();
      reader.onloadend = () => {
        const popup = window.open();
        popup.document.write(
          // tslint:disable-next-line:max-line-length
          '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAACA6SURBVGhDbZpZrBzXmd9P7VXdfftuvLwkL0mRorhJlChSFkV5kZexbHkQyWM4iTGOEWOCIDCSlwkSYF4mgBHkcR6Sl0yAQTZkBgNkPDOeeLzBY8syJWujVsqUuJOX691vb7WdU6fy+6pJyePkoG7d7urqc771//2/U+3UtlCOo+4Orzm7tlYV/xzlKsVLlxMX6ko5ttKlEwRKBXntViowjmOUypTKlVrqqesr+a219dXecCNNi7Kq6zqsmMZGQdjtJDPTE9vnZnfMBVu6KlHKV3JuXlReVQR15XiOLFw7yg9Z31S153OXslaEkQ8QhAXlzJ/l0ocKjHWQu/mkruVaZStrdBgyl9WmrKoqiiKmqu4eqlDqTs98cPXmtVvLH1xZHGmV6qqoHY0JHFc5nuu6nnWtqZwaPWrXsYFjY9+NPbt359ZDe3Yd2b9n24TLAiyMVTxl0VYEEQk89C9Lw6LjC80QuZt7xu+twz2N9K7FvI0qWJ1zbTHuWFGGg8RaKW3dQWGjxM1qdfHa2itvnXnv4pV+UXmtblZZXTOJ57i+6yAMg5nEeAwH6RmsUBnHlm5dtQOnygdt39m/e+fjjx45tG97EqiqUDNIW6Gw9Thc5fJnLOZgWnRC9mZeXMFLbCge0Mhb137FWT4VYzS36SrPrLVeFNdejLFFgSZaXjuz/NKrr12/s2yDSEVxalVqqjBqG4kw5kBuzM2cWKcZooDjeZ6PdsiE2azV2TB0VeI7Lj7T+daZ6Y+fOPHk8R0dpXAIceWp2rclQlVl6cVJI+E9czY6uDXBK5oQ2cqK8ST2GI0CVtlSzC9X/KH1c9fpaXW7r/77d77fyyoCHJMSThpBMbkfGlvLDEzoiLgy8EYjOioQfqLI+DKxbmuUMWVOzLTCwLW6MjoOwpl2+KVPfeyJh+ZaSsUcdckNiDFY73Wm50gRsXljIWb2mEdCiIRtRMd2nMV68jGJUhVZilGdpFs67p2RevHtcz97/cymDTLrIgwWxay6qjm7noeECNeEp6wyNlVtLanAQDHLH4OQYNhavs6LylSmxCfjyAuV6aji2OH7nv3s41Oh6tTVhF9vbqxMT8/UknUB02KmewogLwogeDPneEmGyCCAo9Ic37UJnreubZ56471LSxs97faVg2v4oovTrJUbHSdwPWMMQU6eIiprNILyOSks0Y/g8oaVxmhiHXwS+D4fSVY0enGlKtK2W0WqmPTt1579wpMHtqrStHwbMbOkseTYWEjey0TYHBn437zhH0sjPfO7JSHh+quFOvXGr/7ulbfX87o9u80E8dJmT9yCpM1AZGJj/HWEYVT4FMwRoSX+cUJjbM+QHxJgDI81uIjAGGIc2GjnKUfiKh+1vMozGdn8+ZPHnn7yoQmcWJnYcyScGDXLNCs1UotnMX6ZDqNW1BieEPaK2suwtKP+9tTZH596bVAHTtwuQf3K+mHAwgYR+LqHIUQTmVZyVbJGcrRxqkSnuGrs2/GS8raR4MPBa8Lso+EDvCZPfDTOvGzwmRMP/6MvPt7mPl12A26kHCGmdfwIrAKcnAoXy6QGKJA64vmkp3aCdav+8kev/vLMJdWZsX681htUjh8EQZmngUfWemRJIxxu5cvWdfyx6BweV8XFokCTaL8pNNcbu4/HOKrHZwmkOI6dqlRVGdVloIcnDu75xpef2uKR1jYbrnc67bqsnCDGYUZKK06uKo81QRGnLsjKoLWs1Y9/+d4L75zfKJygOzsqjBRFzyt1TrbJMqBvVaGG74fMYIxBc64jN0PUkP9i+7ETxtd/fXykAHGLeuMzHvD9sizxJ9nUCj3dX5lwis8eP/y7zzwRlXo6csgT3w9Ybjgs2p3OXcMUJfXYNdZF4KFSL7974fnX3+lrN5mZNz51IKxdL89zPKB8aqvkikQOgE6VtU7ghcQ1B5dFNvhFc+DkBry5/+4xvmF8T/PirnPEZ/gT+MNWVRXGsR8lqVb+xBYbT75w+t0fnnoXQjKsXC9qAdmEZxBQKuAzoBj54YcEfeoGhR+8dv4OWbuW25H1NtN8OMqCMOx0Wq4AgM00HMd6AUu0AJ9aE3tlIEVHNYdUL6nvFFuABdmkMCDj3UMA9d7ReOjXlRF9IFtJHOKEQmuKX27q0o3KoPOTl9988b0bxnMH8CY/IiKgGEYXbuN50I6YljJxfcP++NTpOwNdhx1CpDQ2y7LBYACwdAm+uor9EOfqIrdo7tQRUYSARpMAkgMg+pgFgCp1JYe8ME0cUT7kPD7GtzUZ/qEyvFBRAGZhkwxtBamkrHg2aA1s8Fc/ev7SmslxKYDkB6gahNxb50hZOBHM43apfvDC25jfn5gt3AjtK8clbKoih4R2WjGvWYPKYUpdGk0UcQWtChQYg+i9NBgPBGzG2NK/kQlyP5UBB+Gbe3eCmCVT+WGElKMUaZ04ChydJkpHNt81nfzBP/8yjLKtbGBLqaV11bNu3LNh7qqXzq7++d/+XeqEeR3gv7jVGWUp+RWHvikLn5phdMvzZqYnQz/Y7G/iGSoQ6E0Cjpfn1YcZLBEtqSpYhIicP5RSRi1YRb1oOBjRicUlGHwPBpp7gQ+cuH5AnBRZDt92rO76Tj3c+OZXf/uTD80lRk36xpYjpzab2glTN7ll1B/9tx/d2sxzFThRBBoxnZQZ4pml8biqYFeR1aGjQ1XNbZmGa6ChJXNKvOGxWD4chL4PjQadEyhqOvRrcU5NHCtVAl1K6i5KKyfIjTJhUJD6gLpB8jamr1RmHVM3WCcCSEmR1XlPWgWVnmt5//r3nltoqWnH+lWGfIPMuBtu63svXfj+y2dSL9YqIE0p87+uAMmFB6Kq+NbXf2fXtBe7qhWqPAOHPbhzpiEEKg6FASawMAIXWMamWrX4slUFBQHM8JSpVQEOFLrXy946e/7C4vXl4ajyYy+cLPLQD5OyziuXGuOL/+6JzhkDKWtgL4nNP3vswDe/+EhYmm4o+ZOlKrqVO//pf33vwkpuognj+MK/haXifekqJHZJR6dqm/T3v/7sw7ti6C6UnzriNfVdeG0T1PQNIZ6ie4DG14rSSXBQYMhxEIJjHGpyZ/MirdWLb1794amX1kuVuZ0Ba4cRQfX/KkBscg4cFepsLij/8F/97qxfd32AvwZ8nHOXb2fatie6xDQwLORFsP6jIXHMcGzoVNIEAhdKdTwVVrVb1p7mhRyRsWFlWYOqCYXnHp9q6hpeRLUKjYlM3q3LLrFTVH6hulp98bE9/+af/ZOtHYewD2N0NJI4/7/VcQIVwI/iYWFOvfoe8AdbdnMn2DTq56+8DoOgAyU6MbnOC5nl3riXfALlWheNsSUnWQz2Ffl1O1AJpR59QpynfR++V9Q2K/WopjGyZRP6VeLXLb/2IFl1FoZlK7KhazDH1gn1+9/6eqnXwW1iTWJXrN78uzeAVGgXHKygz3W9l998Z8DUpBsd1u3N/PL127mtqVm5LsMADGCSsfvuWUI6Hul0S3ptsZIjhUA3nFVKFTcwKnAKpAJ8ScMqiDhKJ9RuREmlzlBAYR0UW85pNqxU4eNKU8Z1nVj13G99GsCmODDZh9KTzbxnaUSn46A9RPqidjey/P2rawCDSxSeu3pLxR0DrjUUF13DUDQYW6IB7/FLJvJM3NlUqgeBpRcPWo4XiM1pW+nlKRGeXwWJ9tpLeb2pvL7y+yoYKbit9KIF8SXdYuz4SdyaGhmkEvIDy93qq08ePOxuDn0a4EYHhiDQvSFsnLh2fSALIqCi9ltnz8F6vH/57W8//9KZtVTDlpPudFbiROyIl8FzLAtOc8Yiss1AKsJA1taHq0srYRBMtCLgEC4kd4gjYLfiIjqG189evLg6/OD62uLt3tWlwa1BldkohpWHIoI2BlLguneT3MWLjkOcnb14vU+H7AYNjEoWiw/kHxekaSu1lsYGULLGFPmx44e9b/zBtz+4fEurqJ/pnfft7Q9HmiaaCQWDgPiQHsCF89Q1NZ4EWF5avnj+4rXLlyai6PCe7SCAFCHuRhENr3aMqzZz9Sd/9tenP7j2/rXl984vnrl0/Y2L106fef/cucsHHjhIwgjlpMMlGKz2HWq5hIwbqVffurSaw3I9C2h+pEBzdl0kgR3xQjKwrnSRHTz0iLu0Upy7cAUgOnr0KHbBfVAGAqkG+ZtOfLyfwUdEcBgnhQphV8YhciBvzWB1GqqiBBZ8aiZw6YGbofGStPLKoDV0os3a36jd64PhT14+nTfNUOy7TBm5BJXScEtPjWgBPgqZu6ORvlmn6RwZOFmILdWz9pbWR+7y6jpXb9++vbi42Gkljx07trCwQHLHSQIll3qMN8BWwqqSrTZJUHp5kkHwHXH5r8F/1HTpf5tVcB+cWJAbHkWGYBXfrQJ3YMuVUd94qihUlduO52r6bkPldFPySqnNMr+XvX9/CKqiN7VINCJ14GiV8q/cXHKXb9/B+0kYrK4sXbl0+fLFC0i/d+/eJEnoVmhcGHicLokzPkEgOcgGzijQuLPpthEeqTUFLoTUEMm2jImWKqNcTIaOKkZ61Nu9MEeNoYpH0sCpJIwSPxga26/V8tCspaMm5X6D9slbcpIk5DVBwQWYCOT9xu0VNwr9hW3zE50WhRpus762evXylatXrzZwFHgoSoAAHDEuiYQ6S3kWfoboDZ4q0+CoHKQjUMkSpZmKbazSsOht8ap2uhGuLd3n108dPvC5Yw+HxuaDvtTkvHRKctGiDFq98OKr2qL6r4cRkwrLFRNBRFinSWAWE67gBuubQ2/fyae3zG/dsXPPxNRMlhdUgqrS7U47ywkY2s6wpGURpWuMaCqNBq7VkNsHdu04sBv0o8+RHCbjyS+PbJHiIJsRuxd27t42f//2LUcPPPCxw4c+98Rjnzh6eDZ2AreM4tAWmRMnADe1fbNSb15e/dEvTmsnrhsiI3214Ii4Q8jcmIJI9Dd4IT6RBh4ocv79d148d+Wy15qZmd+5nmZpRpVw7iwvhVGLLgekHxUQGSDIbfuKxAf4fJN1VfbMxx997lMPhnCEZjOQ5giiIvsUMKQgHhCnpGnDfwgqSF47lAigO6qcMoz8wGkBYFCBvlJ/89NXXz5zceROrI+AaeBBKBUhKnswNaxIdr5AE+X6GisRBqhjygiOCxX4D//lv26fX4jieGlpqdNu45wQUpKTTI6AELy3tlFIZfP5Ix/4siceqB7Yue3wfXNhrQgrvOx5vvTH0mFIiIV0eg144MbIUZErDafVRSvmE4qHRxFd3uy99uY73/3BTz64enM9NYWXuGEi3BV/QiKl8IjOkmVN6NM9Yg6UAn8BdJKIyPCOf+Y5Mjj0vIUdWyuTLd26QT7IdgsMptDYw/ODdJjyPQsRgggoG/r1TOI+uHdhz/xMG8kwh5ENKtAQAOBOXdEDOL7sbRHDooOqbOA7pDggCP+GewcuRdCHQCPh0upm5YX0IZpgkZ08SBtWodT5lW02UmVW+LHhCjKgj2yoWno35f2Lf/vvzn1wlv7y4P77D+7fte/+fbdu3QCayFqtdZP+FTkmg85LdteMqrKwKvbv3Lp/YY7GQMwvkSle4EQz7vkRZRVDkTFozJk+WmM82Z/20kzHEaSbUuC14+TQ/j3HHj9WWP/K9ZtYXcLd9eC4lE+3KWdjPjZOA9lB9X2p+ijW7H96H3/md+bn5mZmumvra6mM4Z77du9a2HH92jVgqR1FUxMd+smaQpUNp6YnTEWxg1HbB/ftPrgwIw8CcLqFx+FeKXt1w47OXL59Z1Df2Chv9fVKL+2XVQoTSsa7s2KWMk1jPO+7tI4UtZ27t05OzV6+eAkHkBu1K5lA7DDuJrHs83lUeiJCsN1ICyeM4e3lgpS9eftG0m5fubY4Pbd1/4FDftwajPTK2ubLr785t31heaO/3h9QEwrlpNqG1kxUg69+9ol/cPJQC5YvEQp/FvGhnNh7eVj/0R//j17hGpfIr1utsNJ5VaQ75qZPPnrk6SceQgNSX+mcCM216ZV13GkNlPqT7zz/1qU7Qyepw7a2VE95quDJUwJxAi/TsgrCiFjyapMELpp7X/nG7/mB9+ChQxvr6+1W9NjxY+fP/ur82ffpqxbm5048dmSy0xn0NmxVDAe9ytA1eJS0QOf7Frbu3zmPSf2mtEsRs/KwhD59qJz/8/M3N1WrDCdt2FoZFiPjhd3ZtKguXrkaJ537dsygttB1UsX34jAapXkU+LOzc6+8ey6nAoUJzjREkpBK6e+AoSCINCiCSyA1vhu7dmpywp2YaGfDQVFkjx1/6ONPPn7j6pVHHjp0YO8uPdh4+YWf3rxyOarLZz534qknH9uzsKUVwCJKX55QlILVhCiHOAA8bCLcqUt0IQOTCbc9A9QP68jG097k9pXMWSsdWsc3z54fP9QBjowxWks1b4d+R6l9852JOJa4Ib4l7gUbpAo1W/nmLs2GN/FeY8256Um3O9kBHC5cOHfu3MWl26sH9x+gT4k8txWGh/fttdno2pWLi1euRp567re/8MmTj2+fnZhtBb6tcOK4ZmIhPC1JrKA8zR4vYd4Qo1wIpE/jN9RO6cUq6Tpxu5flGDH0CWj0D/2AZtOJaG1otUo12e3Kd+kviMhmyLwSQ9LrNiWVJck4o3S2d+e8OzXVLsvy2rXrJMDLr7z22utvsPy+Awe3bds2Go3a7Tbodf3qtTIvFhdv3L9713Of/+wnjj9837a5Tgt8B3PorxqoYBkNbavARdidLYa1HiaB9WvdhogrOk8nS0f0a5MTHb5RWpoA4KuhUOOKUeokVK1W654CjRME2GTIDprwSkGgwLG+LSKnum/HrOwWbJvfcfjBI64X6tq5dP3GmQ/OX795Z3pufteevYM0W+/1407n5p2lV06/eenSpf7KzbnEO3z/wn3btgjICerDf1wA1g2Y2XrKTkUqsVlLpa2q3zK9iXrQrbNp37SqER89fmQ/SoK/3FmDdEWJJgwvjBBZl9ISElr4FE14AYnkjJK85baqyEOKT62nO9GurcptSaGvl5aWaQ6DpNOdno8nZmgLF+HaWt2///AXnvmirryiqtfW+2+88cZwbbnYXCl6q6PNdYwne6PSnUA7aAXqMk8JLTvqTyd1S28mejMY3G7lK3G+NK2GTxze/bUvfebkkb2BNSGWo64pm8QhYVJopa0UjWGaESlEIqYhYMYxI5HUDOpk4DlVmcZevXfHXAskQIqV9ez9S9eCTvf9i1drodDSf+3Ztfu1116ZmJiY3Tp/8MiDV2+tvvPe++Vg7R9/+oknD28nzGAHlFgKRwIPge7rMqJDJIp9mLq3AtOM47JWrIHd8oYUAVKJp7rkrO7HcBLf06nRtecnE7ILptTNXP3hf/6rFe1bL7JBUGqwX1gJ/BI6ASmgDUN0P9voOMU3v/LM0UM76ONUJwpGg/6pX/xiZm7rzPwOwP6Dy4uLy2szO3a5UbuXln/653/zxhtnFm8tqdoPYAhCBllRSM5km4yWh62uH2pdFyXhb+qqmAidllJTrAq3y7OoLLcotSWALaSBok8ICH/qVBBFrXbbuiqtVL9SF65vpAUwJslBDo9t36StjPGWR+jWkedMt8KH9u2IkYSmdrrtAzjT3ck0z1rdqW279iw8sD+enB6VdT+vNvrZ1u0LftiK4jbtW5NaKpRHbtjMQEh4e5fjOl7UmqDVIKzgDk6trS7bvjMVB5MBlcskynSlkZFblROaUp61VRDSjF5LrWn1s1ffwoMQHqYkj5lZFICbSzMgPU0UeOigyvzRBw/CAhLui5QlC3Zum4M/rK2tXbh05cKVa9du3KYFxxR+lBDfizfu3FleDvxk//5DoB4zYGUsQhaCm1JXpK8V8sOEJGWRF/QJIfYNCEjZKZRW0Da7RuStPPGNC426XeOEWaWixFkt1EvvLn6wuEQuM08T/OPns3igsRlBWGmqni3LOPKePHGc6UJ5KFFmNO0TkbBW2kjKwZXFa/1Run3X7qW19bPnL2QlpcbQHEOofQ/aivcJGAFOOAnfwqK8RkoSsSjrKMZXHchcYQqJfyfIrRAekcINsVhWe4XsioacQRzI/o0+LcEb3/3pSzqagJFz37jtYvAlNBnHET6pjAkD5/jRI9snPdcaX5X4OQOjRl5cBd5//NMf5pAQP7l8/Q4Xd+7cub66lmUZzHQ0ykAauMPXfuvEwR0uTkNo4ItQEb5JJNDggkNUZDDfqIhIlxhrXsObGxchFUNirsnpjZ5aXd04c+7CuxeuruWWsp1LZnjSMsk2sVBv4YkIOq6PRebpbNds+1tfe3bPtJqRxzwplWeIYVIVZEq9d3P06pnzS0O93Etvr2zEidS4ycmJ4XDoC21Aiuz4gftnu0llivkts8ja3+yBVHleghVE4Pb5bcNhH1NNz87wrcnJSV2Uvc1N+g+JY9/vpekoN8NSL6/3gBjZy0RYP6ABKCnaIZHgGAsfwexUAsFDdJK8MXloy1CnX/n8J595Ym9C1DjGsbkoYOhUvBAi2VPqL77/yjuXbnqd6fVh6cbyhIaIlGckgdcOw+mp7tqdW6GvkGKi24YLAqPtRB6iEK84Sh6BW8tFzo888siNxevUoDgM5+fn0yK9c+cOLWvYavVGee3TNPrSvWAbGLgQZHn2gZWYoj3RzUtDXy4/Fqor12QTfm1Hm0f2bP/Gl59emJCfgkDSnBpuX2ODyvVjnL9p1PJA//H//N9F0C68zlqqVRgFUQKnIIEceYriRgHNGgY1MGGErqtKirzs3rkEW6fT4YzZjh079u6776I80m3bNk8gINoDe/f0+8NLly6nufRwI8IUaKEX5TOAjNStbAguVlUO7ssWLVlqHVPESvtlj+7p689+4fj+LQB0TXcKIllDm1cQa0KOCFgvouLAyP/iB88P6vY6bUzUyWgiHC+OQ9p2bTKCHVhDLLFWUyYRnZU2NzeJpbEVpyanTaX7G335YRDUl+H5ceBvmZ0d9vrEW9xqEzk9ODQiwGVphrzmaSJmor+J40Gac2byfDSYaYWBHkyq9HMnjn7500cdbUm2EOBFVQuTlawXUhx7QHXpmeJj+7Z95mOPzLS97VumJhJAU+elznQ1KgBux7iB8fw6jDgbx8N3eeVwTG/dkRlVWDfV9cawWOunTkRT4kVJtyhMiu7KzYwdaNM3ZjXNNks9gn6iP9BIl9XEPplOOBXNz8ywEe7txIFIlfU+8ejhp08ehXJ3PDCnR1oTOLhJWH0q/JYkNyYbTkAKyuKpxx96YGFO91f0cHP73AwcAdMGOJQiRZ7RFBjLITsfBIDrQZtp2cJWO2p3oqRdmArAZf6k1ZnsAHhBFCalqa7euLkOHrSTynMy4pAEbHDJk1ZY0QjT5eAH8oHISQe92LOJ0lV/7YmHDzz9iY9toRYWo8h1OnEMggd+QOwIGLaSDrSmSIsgjspsMBl6bV899/kTJ488MNdyu1hZZ0oD6lIXZXPRkb1eAp3AFivIj3kEpPM8t6YaDHrbt85Jr+TU+XCwsbrSSWLwNU9Hs9OThOLG5qY8Y/Yd8sv1CDJ50CrPvZWhzS+zFG5COLRcG5SDWA+PH1j4h1/61I4Wa2vaYfgqXVxB0WmGo8Ep/kmHb3U6CpKkhM9ErYKcturPvnvq9LlrQ9qP1tRGVmJjgJX0FSO5rK1oBySJSQZp+YI8zaa6ndFgSART63QJUFA6S192IYgWt6Au0JAa3BZAY4UuNMVEfvFAkQpDSmOepzRMM52w6q08vG/nP/3q01tDhWyz8oMgcQ4TsSCkUyo8SSZ6NNowWXNQgNx+qYmWDaO+/4u3nz/9q0Hla7dlg9jxPWIUBXhBLIkmeJ/OmyuyVdbMCDjIr3iaEKWKMjv4wp1N5wJwjjEergkAyHKYr6lWuGjY69l80PJs1zMnHz7wzFMntsYK/0Acmweicv/4LEYT04v1/t5otgCEsxjH7xXGj8KXL6z95Q+fX81VUcuuPJVSoogIYiLJIiFeAqkNgaSDg8EItjcd1yBL8VVTYIUQYDLu5APAOwil/U3TIQUxiUL58QXYonOnHD18/84njx587MDO2VAQk54OwWShuwqMNZA/PAwLu/ugdzwo+82Fqtfb7E7ODa0L0V3O1Pd/fvrc4u1+4ZS1Ky7gKwAFiIQfGsnvmoIZ0YQTRocpwV0AXAfXY2b5iFtQAB211kRjFPpEGzBuy6KbBKa//vjD+z9/8viOKbfj2DY+bX49QbmGt/LlsRdYr9FJfmH6kQLi4EYBnGWKoR8F+Sij2yhd+RHRwKi3z61/72cv0iFAznygwPWGsDQiIUwK2cRhHaluIrFsbcqEJD2q8VIuNmduwIUW/iQ7A7YpSe5EHCaeN9UKTx5/cO+26X1bAtlzlN+eIQuSIy3EX55IMD5SQB4qC8FvfizNtWbwcfOZNkXmM4/rEzZl7WS40FNocur04ku/fOX26roTt5wwrtxIO651A/l5k3XhrY17kFM46zgDZLsWW4k6mkShLbQVtL7sBH5cV36ZT8bh4w8f+dxTR6ZJ1Ga7mwPYlO82syl5JHM3TJix0UHsM1aAl2KzMVtEevlfN8+TVF0K26Ksx9zey7SFFQWqV6r3zi2++ua7F27czECUVlce17vy1ARJm4hqiDZTNdPjGnlyRxaTWa6VLVIivtKIuH1y8pOPHjlxdD/9Pt0R9SgOhe3SgKJk80xPnr07XGtEZtyTnoMcqMeAKouNz2Mtmx/SoUvzFZxI7LouXI0YsU6ATpCOYa1urgzfuXD5VxcXlzZHaQWjlC1/eZrb/MoWVwTy66qS8gFUBrLVrOPATQI11U4O3rdw7MGDu+Y6XVpN1q5MIkFILZEiwxe5Jv3PGKsasRqyN9ZCpJcr9xQYj7tqjHWgkQkl/a2iB4PAc5VPCGg0UV4pDFwe9KMJrclaqW6v19durNxcWVvfHEBzOOS5fxgBq9CZmW5723R3fsv0rrnprVPRlsnmkXeTcpylt6oyPENZEJinwshDQvgOnwv8ytMTsbcoKpI0LY5S6v8C2x5XZecK7MoAAAAASUVORK5CYII="><br><img style="width: 1in" src=' +
            reader.result +
            '>',
        );
        popup.focus();
        setTimeout(() => {
          popup.print();
        }, 5000);
      };
      reader.readAsDataURL(xhr.response);
    };
    console.log('before open');
    xhr.open('GET', 'https://bwipjs-api.metafloor.com/?bcid=code128&text=' + text + '&includetext&rotate=R');
    xhr.responseType = 'blob';
    xhr.send();
  }
  onHide() {
    this.onClose.emit(null);
  }
}

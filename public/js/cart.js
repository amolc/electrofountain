<script type="text/ng-template" id="template/ngCart/summary.html">
  <div class="row">
    <div class="col-md-6">{{ ngCart.getTotalItems() }}
      <ng-pluralize count="ngCart.getTotalItems()" when="{1: 'item', 'other':'items'}"></ng-pluralize>
      <br/>{{ ngCart.totalCost() | currency }}
    </div>
  </div>
</script>

<script type="text/ng-template" id="template/ngCart/cart.html">
  <div class="alert alert-warning" role="alert" ng-show="ngCart.getTotalItems() === 0">
    Your cart is empty
  </div>

  <div class="table-responsive col-lg-12" ng-show="ngCart.getTotalItems() > 0">

    <table class="table table-striped ngCart cart">

      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Quantity</th>
          <th>Amount</th>
          <th>Total</th>
        </tr>
      </thead>
      <tfoot>
        <tr ng-show="ngCart.getTax()">
          <td></td>
          <td></td>
          <td></td>
          <td>Tax ({{ ngCart.getTaxRate() }}%):</td>
          <td>{{ ngCart.getTax() | currency }}</td>
        </tr>
        <tr ng-show="ngCart.getShipping()">
          <td></td>
          <td></td>
          <td></td>
          <td>Shipping:</td>
          <td>{{ ngCart.getShipping() | currency }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>Total:</td>
          <td>{{ ngCart.totalCost() | currency }}</td>
        </tr>
      </tfoot>
      <tbody>
        <tr ng-repeat="item in ngCart.getCart().items track by $index">
          <td>
            <span ng-click="ngCart.removeItemById(item.getId())" class="glyphicon glyphicon-remove"></span>
          </td>

          <td>{{ item.getName() }}</td>
          <td>
            <span class="glyphicon glyphicon-minus" ng-class="{'disabled':item.getQuantity()==1}" ng-click="item.setQuantity(-1, true)"></span>&nbsp;&nbsp;
            {{ item.getQuantity() | number }}&nbsp;&nbsp;
            <span class="glyphicon glyphicon-plus" ng-click="item.setQuantity(1, true)"></span>
          </td>
          <td>{{ item.getPrice() | currency}}</td>
          <td>{{ item.getTotal() | currency }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</script>

<script type="text/ng-template" id="template/ngCart/addtocart.html">
  <div ng-hide="attrs.id">
    <a class="btn btn-lg btn-primary" ng-disabled="true" ng-transclude></a>

  </div>
  <div ng-show="attrs.id">
    <div>
      <span ng-show="quantityMax">
        <select name="quantity" id="quantity" ng-model="q" ng-options=" v for v in qtyOpt"></select>
      </span>
      <a class="btn btn-sm btn-primary" ng-click="ngCart.addItem(id, name, price, q, data)" ng-transclude></a>
    </div>
    <br />
    <mark ng-show="inCart()">
      This item is in your cart.
      <a ng-click="ngCart.removeItemById(id)" style="cursor: pointer;">Remove</a>
    </mark>
  </div>
</script>

<script type="text/ng-template" id="template/ngCart/checkout.html">

  <div ng-if="service=='http' || service == 'log'">
    <button class="btn btn-primary" ng-click="checkout()" ng-disabled="!ngCart.getTotalItems()" ng-transclude>Checkout</button>
  </div>

  <div ng-if="service=='paypal'">

    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" ng-show="ngCart.getTotalItems()">
      <input type="hidden" name="cmd" value="_xclick">
      <input type="hidden" name="business" value="{{ settings.paypal.business }}">
      <input type="hidden" name="lc" value="CA">
      <input type="hidden" name="item_name" value="{{ settings.paypal.item_name }}">
      <input type="hidden" name="item_number" value="{{ settings.paypal.item_number }}">
      <input type="hidden" name="amount" value="{{ ngCart.getSubTotal()}}">
      <input type="hidden" name="currency_code" value="{{ settings.paypal.currency_code }}">
      <input type="hidden" name="button_subtype" value="services">
      <input type="hidden" name="no_note" value="0">
      <input type="hidden" name="tax_rate" value="{{ ngCart.getTaxRate()}}">
      <input type="hidden" name="shipping" value="{{ ngCart.getShipping()}}">
      <input type="hidden" name="bn" value="PP-BuyNowBF:btn_buynowCC_LG.gif:NonHostedGuest">
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
      <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
    </form>
  </div>
</script>

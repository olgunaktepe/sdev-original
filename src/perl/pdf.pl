use CAM::PDF;
use JSON;
 
my $vars = &parseInput();
 
my $pdf = CAM::PDF->new($vars->{'file'});

@files = (); 
$pages = $pdf->numPages();
for(my $i=0;$i<$pages;$i++){
	my $pdf2 = CAM::PDF->new($vars->{'file'});
	$pdf2->extractPages($i+1);
	
	$output = $vars->{'outputPath'}.'/'.$vars->{'outputFilename'}.'_'.($i+1).'.pdf';
	$pdf2->cleanoutput($output);	
	push(@files,$output)
}

$files = join(",",@files);
print "res:".$files;
exit;
 
sub parseInput(){	
	my $input = $ARGV[0];
	return decode_json $input;
	
	my @pairs = split(/&/, shift @ARGV);
	foreach my $pair (@pairs) {
		  my ($name, $value) = split(/=/, $pair, 2);		  		  		 
		  $value =~ tr/+/ /;
		  $value =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;
		  $value =~ s/<!--(.|\n)*-->//g;		
		  $vars->{$name} = $value;
	}
}

#print $pdf->toPDF();



#deletepdfpage.pl /home/nrzent5/public_html/bot/ticketFiles/158968_21398800391219583431_794824170491192099975ticket.pdf 2- /home/nrzent5/public_html/bot/ticketFiles/test1.pdf
#deletepdfpage.pl /home/nrzent5/public_html/bot/ticketFiles/158968_21398800391219583431_794824170491192099975ticket.pdf 1,3- /home/nrzent5/public_html/bot/ticketFiles/test2.pdf